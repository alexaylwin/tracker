import { Component, Output, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Activity } from "../../models/activity";
import { ActivityRecord } from "../../models/activity-record";
import { RecentActivitiesService } from "../../services/recent-activities.service";
import { Store, select } from '@ngrx/store';
import { AppState } from '../../store/timer.reducer';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'timer',
  templateUrl: './timer.component.html',
})
export class TimerComponent implements OnInit, OnDestroy {
  startTime: Date;
  endTime: Date;
  duration: number = 1;
  intervalId: number = 0;
  currentTime: Date;

  seconds: number = 0;
  minutes: number = 0;
  hours: number = 0;

  displaySeconds: string = '00';
  displayMinutes: string = '00';
  displayHours: string = '00';

  public timerState$: Observable<AppState>;

  @Output()
  onTimerStopped:EventEmitter<ActivityRecord> = new EventEmitter<ActivityRecord>();
  
  constructor(private recentActivitiesSerivce:RecentActivitiesService, private store: Store<AppState>) {}

  ngOnInit() {
    this.timerState$ = this.store.pipe(select('timerRunning'));

    this.timerState$.subscribe((state) => {
      console.log(state);
      //TODO: Why is this initial state not being handled by either the reducer or app module?
      if(!state) {
        state = {timerRunning: false};
      }
      const timerRunning = state.timerRunning;
      if(timerRunning) {
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
        
      } else {
        this.clearTimer();
        var newRecordedActivity: ActivityRecord = new ActivityRecord();
        newRecordedActivity.activityId = -1;
        newRecordedActivity.startTime = this.startTime;
        newRecordedActivity.endTime = new Date();
        newRecordedActivity.duration = this.duration;
        
        this.recentActivitiesSerivce.addActivity(newRecordedActivity).subscribe((obs) => {
          this.onTimerStopped.emit(newRecordedActivity);
        });
      }
  
    })    
  }

  startTimer(): void {
    console.log('dispatched start event');
    this.store.dispatch({ type: 'START_TIMER' });
  }

  stopTimer(): void {
    console.log('dispatched stop event');
    this.store.dispatch({ type: 'STOP_TIMER' });
  }

  private clearTimer(): void {
    clearInterval(this.intervalId);
  }

  ngOnDestroy(): void {
    this.clearTimer();
  }

}
