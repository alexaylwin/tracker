import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityRecord } from "../models/activity-record";

@Component({
	selector:"timer",
	template:`
		<div>
			<div class="timer-display">{{displayHours}}:{{displayMinutes}}:{{displaySeconds}}</div>
			<button *ngIf="!timerStarted" class="btn btn-success btn-lg btn-block timer-start" (click)="startTimer()">Start</button>
			<button *ngIf="timerStarted" class="btn btn-danger btn-lg btn-block timer-stop" (click)="stopTimer()">Stop</button>
		</div>
	`
})
export class TimerComponent implements OnDestroy{
	startTime: Date;
	endTime: Date;
	duration: number = 1;
	intervalId: number = 0;

	timerStarted: boolean = false;

	seconds: number = 0;
	minutes: number = 0;
	hours: number = 0;

	displaySeconds: string = "00";
	displayMinutes: string = "00";
	displayHours: string = "00";


	@Output()
	onTimerStopped = new EventEmitter<ActivityRecord>();

	startTimer(): void {
		this.duration = 1;
		this.seconds = 0;
		this.minutes = 0;
		this.hours = 0;
		this.timerStarted = true;
		this.clearTimer();
		this.intervalId = window.setInterval(() => {
			this.duration++;
			this.seconds++;
			if (this.seconds >= 60) {
				this.seconds = 0;
				this.minutes++;
				if (this.minutes >= 60) {
					this.minutes = 0;
					this.hours++;
				}
			}
			this.displaySeconds = this.seconds < 10 ? ("0" + this.seconds.toString()) : this.seconds.toString();
			this.displayMinutes = this.minutes < 10 ? ("0" + this.minutes.toString()) : this.minutes.toString();
			this.displayHours = this.hours < 10 ? ("0" + this.hours.toString()) : this.hours.toString();
			
		}, 1000);

		this.startTime = new Date();

		console.log("Timer started");
	}

	stopTimer(): void {
		this.clearTimer();
		this.timerStarted = false;
		console.log("Timer stopped");
		var newRecordedActivity: ActivityRecord = new ActivityRecord;
		newRecordedActivity.activityId=-1;
		newRecordedActivity.startTime=this.startTime;
		newRecordedActivity.endTime = new Date();
		newRecordedActivity.duration = this.duration;
		this.onTimerStopped.emit(newRecordedActivity);
	}

	private clearTimer() {
		clearInterval(this.intervalId);
	}

	ngOnDestroy() {
		this.clearTimer();
	}

}