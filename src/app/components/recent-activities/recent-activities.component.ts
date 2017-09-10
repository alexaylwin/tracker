import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from "../../models/activity";
import { ActivityRecord } from "../../models/activity-record"
import { RecentActivitiesService } from '../../services/recent-activities.service';

@Component({
  selector: 'recent-activities',
  templateUrl: './recent-activities.component.html',
  styleUrls: ['./recent-activities.component.css']
})
export class RecentActivitiesComponent implements OnInit {

	recentActivities: ActivityRecord[];
	
	constructor(private recentActivitiesService: RecentActivitiesService) {}
	
	ngOnInit(): void {
		this.getRecentActivities();
	}
	getRecentActivities(): void {
		this.recentActivitiesService.getRecentActivities().then(
			recentActivities => {
				console.log(recentActivities);
				this.recentActivities = recentActivities;
			}
		);
  }
}
