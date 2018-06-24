import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Activity } from '../../models/activity';
import { ActivityRecord } from '../../models/activity-record';
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { StateService } from '../../services/state.service';
import { Subscription } from 'rxjs';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'timer',
  templateUrl: './timer.component.html'
})
export class TimerComponent implements OnInit, OnDestroy {

  @Output()
  onTimerStopped: EventEmitter<ActivityRecord> = new EventEmitter<ActivityRecord>();

  startTime: Date;
  endTime: Date;
  duration: number = 1;
  intervalId: number = 0;
  currentTime: Date;

  timerStarted: boolean = false;

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  displaySeconds: string = '00';
  displayMinutes: string = '00';
  displayHours: string = '00';


  constructor(private recentActivitiesService: RecentActivitiesService,
     private stateService: StateService) { }

  ngOnInit() { }

  startTimer(): void {
    this.duration = 1;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.timerStarted = true;
    this.clearTimer();

    this.startTime = new Date();
    this.intervalId = window.setInterval(() => {
      this.currentTime = new Date();
      const diff = this.currentTime.getTime() - this.startTime.getTime();
      this.duration = (diff / 1000);
      this.hours = Math.floor(diff / (3600000));
      this.minutes = Math.floor((diff - (this.hours * 3600000)) / (60000));
      this.seconds = Math.floor((diff - ((this.hours * 3600000) + (this.minutes * 60000))) / 1000);
      this.displaySeconds = this.seconds < 10 ? ('0' + this.seconds.toString()) : this.seconds.toString();
      this.displayMinutes = this.minutes < 10 ? ('0' + this.minutes.toString()) : this.minutes.toString();
      this.displayHours = this.hours < 10 ? ('0' + this.hours.toString()) : this.hours.toString();
    }, 1000);

  }

  stopTimer(): void {
    this.clearTimer();
    this.timerStarted = false;
    const newRecordedActivity: ActivityRecord = new ActivityRecord();
    newRecordedActivity.activityId = this.stateService.selectedActivity.id;
    newRecordedActivity.startTime = this.startTime;
    newRecordedActivity.endTime = new Date();
    newRecordedActivity.duration = this.duration;


    this.recentActivitiesService.addActivity(newRecordedActivity).subscribe((obs) => {
      this.onTimerStopped.emit(newRecordedActivity);
    });
  }

  private clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

}
