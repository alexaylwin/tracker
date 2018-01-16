import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
<<<<<<< HEAD
import { Activity } from '../../models/activity';
import { ActivityRecord } from '../../models/activity-record';
import { RecentActivitiesService } from '../../services/recent-activities.service';
=======
import { Activity } from "../../models/activity";
import { ActivityRecord } from "../../models/activity-record";
import { RecentActivitiesService } from "../../services/recent-activities.service";
import { Store } from '@ngrx/store';
import { AppState, ACTIONS } from '../../store/timer.reducer';
import { Observable } from 'rxjs/Observable';

>>>>>>> a22423c5060e7dbd53e0fd94f5db61ddf3069355

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit, OnDestroy {
<<<<<<< HEAD
=======

>>>>>>> a22423c5060e7dbd53e0fd94f5db61ddf3069355
  startTime: Date;
  endTime: Date;
  duration: number = 1;
  intervalId: number = 0;
  currentTime: Date;

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

<<<<<<< HEAD
  displaySeconds: string = '00';
  displayMinutes: string = '00';
  displayHours: string = '00';

  @Output()
  onTimerStopped: EventEmitter<ActivityRecord> = new EventEmitter<ActivityRecord>();

  constructor(private recentActivitiesSerivce: RecentActivitiesService) { }
=======
  displaySeconds: string = "00";
  displayMinutes: string = "00";
  displayHours: string = "00";

  public timerRunning: Observable<boolean>;

  @Output()
  onTimerStopped:EventEmitter<ActivityRecord> = new EventEmitter<ActivityRecord>();
  
  constructor(private recentActivitiesSerivce:RecentActivitiesService, private store: Store<AppState>) {
    this.store.dispatch({type:ACTIONS.TIMER_STOP});
    this.timerRunning = this.store.select('timerRunning');
   }
>>>>>>> a22423c5060e7dbd53e0fd94f5db61ddf3069355

  ngOnInit() { }

  startTimer(): void {
    this.duration = 1;
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
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

<<<<<<< HEAD
    console.log('Timer started');
=======
    this.store.dispatch({
      type: ACTIONS.TIMER_START
    })
>>>>>>> a22423c5060e7dbd53e0fd94f5db61ddf3069355
  }

  stopTimer(): void {
    this.clearTimer();
<<<<<<< HEAD
    this.timerStarted = false;
    console.log('Timer stopped');
    const newRecordedActivity: ActivityRecord = new ActivityRecord();
=======
    var newRecordedActivity: ActivityRecord = new ActivityRecord();
>>>>>>> a22423c5060e7dbd53e0fd94f5db61ddf3069355
    newRecordedActivity.activityId = -1;
    newRecordedActivity.startTime = this.startTime;
    newRecordedActivity.endTime = new Date();
    newRecordedActivity.duration = this.duration;
    
    this.recentActivitiesSerivce.addActivity(newRecordedActivity).subscribe((obs) => {
      this.onTimerStopped.emit(newRecordedActivity);
    });

    this.store.dispatch({
      type: ACTIONS.TIMER_STOP
    })
  }

  private clearTimer() {
    clearInterval(this.intervalId);
  }

  ngOnDestroy() {
    this.clearTimer();
  }

}
