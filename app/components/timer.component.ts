import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityRecord } from "../models/activity-record";

@Component({
	selector:"timer",
	template:`
		<div>
			<div>{{duration}}</div>
			<button (click)="startTimer()">Start</button>
			<button (click)="stopTimer()">Stop</button>
		</div>
	`
})
export class TimerComponent implements OnDestroy{
	startTime: Date;
	endTime: Date;
	duration: number = 1;
	intervalId: number = 0;

	@Output()
	onTimerStopped = new EventEmitter<ActivityRecord>();

	startTimer(): void {
		this.duration = 1;
		this.clearTimer();
		this.intervalId = window.setInterval(() => {
			this.duration += 1;
		}, 1000);

		this.startTime = new Date();

		console.log("Timer started");
	}

	stopTimer(): void {
		this.clearTimer();
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