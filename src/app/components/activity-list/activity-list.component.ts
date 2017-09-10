import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from "../../models/activity";
import { ActivityService } from '../../services/activity.service';

@Component({
  selector: 'activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css']
})
export class ActivityListComponent implements OnInit {
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
