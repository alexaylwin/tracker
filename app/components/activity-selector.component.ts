import { Component, EventEmitter, Output } from '@angular/core';
import { Activity } from "../models/activity";

const ACTIVITY_LIST: Activity[] = [
	{id: 1, name:"Work"},
	{id: 2, name:"Fun"},
	{id: 3, name:"Exercise"},
	{id: 4, name:"Household"}
]

@Component({
	selector: 'activity-selector',
	template: `
		<div>
			<label>Activity:</label>
			<select name="activity" [(ngModel)]="selectedActivity" (ngModelChange)="onChange($event)">
				<option *ngFor="let activity of activityList" [ngValue]="activity">
					{{activity.name}}
				</option>
			</select>
		</div>
	`
})
export class ActivitySelectorComponent {
	activityList = ACTIVITY_LIST;
	selectedActivity:Activity = this.activityList[0];

	@Output() onSelectedActivity = new EventEmitter<Activity>();

	onChange(newValue) {
		console.log("Value changed:" + this.selectedActivity.name);
		this.onSelectedActivity.emit(this.selectedActivity);
	}
}