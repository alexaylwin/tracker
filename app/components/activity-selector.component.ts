import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityService } from '../services/activity.service';

@Component({
	selector: 'activity-selector',
	template: `
		<div class="form-horizontal">
			<div class="activity-selector form-group">
				<label class="control-label col-md-2" for="activity">Activity:</label>
				<div class="col-md-10">
					<select 
						name="activity"
						class="form-control" 
						[(ngModel)]="selectedActivity" 
						(ngModelChange)="onChange($event)">
						<option *ngFor="let activity of activityList" [ngValue]="activity">
							{{activity.name}}
						</option>
					</select>
				</div>
			</div>
		</div>
	`,
	providers: [ActivityService]
})
export class ActivitySelectorComponent implements OnInit{
	activityList: Activity[];
	selectedActivity: Activity;
	private activityService: ActivityService;

	@Output()
	onSelectedActivity = new EventEmitter<Activity>();
	
	constructor(activityService: ActivityService) {
		this.activityService = activityService;
	}
	
	ngOnInit(): void {
		this.getActivities();
//		this.selectedActivity = this.activityList[0];
	}

	onChange(newValue) {
		console.log("Value changed:" + this.selectedActivity.name);
		this.onSelectedActivity.emit(this.selectedActivity);
	}

	getActivities(): void {
		this.activityService.getActivities().then(
			activityList => {
				this.activityList = activityList;
				this.selectedActivity = activityList[0];
			}
		);
	}
}