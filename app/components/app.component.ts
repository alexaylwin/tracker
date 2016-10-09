import { Component } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityRecord } from "../models/activity-record";

@Component({
	selector: 'my-app',
	template: `
		<h1> Activity Tracker </h1>
		<activity-selector
			(onSelectedActivity)="onSelectedActivity($event)">
		</activity-selector>
		<br /> <br />
		<timer (onTimerStopped)="onTimerStopped($event)"></timer>
	`
})

export class AppComponent {

	recordedActivities: ActivityRecord[] = new Array();

	selectedActivity:Activity = new Activity();

	onSelectedActivity(activity: Activity): void {
		console.log("Parent caught activity: " + activity.name);
		this.selectedActivity = activity;
	}

	onTimerStopped(newActivityRecord: ActivityRecord): void {
		newActivityRecord.activityId = this.selectedActivity.id;
		this.recordedActivities.push(newActivityRecord);
		for(var i = 0; i < this.recordedActivities.length; i++) {
			console.log("Recorded Activity: " + this.recordedActivities[i].activityId);
			console.log("                   " + this.recordedActivities[i].startTime.toLocaleTimeString());
			console.log("                   " + this.recordedActivities[i].endTime.toLocaleTimeString());
			console.log("                   " + this.recordedActivities[i].duration);
		}
	}
}