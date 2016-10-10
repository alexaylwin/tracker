import { Component } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityRecord } from "../models/activity-record";

@Component({
	selector: 'my-app',
	template: `
	<div class="row">
		<div class="col-lg-6 col-lg-offset-3">
			<activity-selector class="text-center"
				(onSelectedActivity)="onSelectedActivity($event)">
			</activity-selector>
		</div>
	</div>
	<div class="row">
		<div class="col-lg-6 col-lg-offset-3">
			<timer class="text-center" (onTimerStopped)="onTimerStopped($event)"></timer>
		</div>
	</div>
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