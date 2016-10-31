import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityRecord } from "../models/activity-record"
import { ActivityService } from '../services/activity.service';

@Component({
	selector: 'recent-activities',
	template: `
		<ul class="recent-activity-list">
			<li *ngFor="let recentActivity of recentActivities">
				<span class="activity-date">{{recentActivity.startTime}}</span>
				<span class="activity-name">{{recentActivity.activityId}}</span>
				<span class="activity-duration">{{recentActivity.duration}}</span>
			</li>
		</ul>
	`
})
export class RecentActivitiesComponent implements OnInit {
	recentActivities: ActivityRecord[];
	private activityService: ActivityService;
	
	constructor(activityService: ActivityService) {
		this.activityService = activityService;
	}
	
	ngOnInit(): void {
		this.getRecentActivities();
	}

	onTimerStopped(newActivity: ActivityRecord): void {
		console.log("caught timer stop: " + newActivity);
		this.recentActivities.push(newActivity);
	}

	getRecentActivities(): void {
		this.activityService.getRecentActivities().then(
			recentActivities => {
				this.recentActivities = recentActivities;
			}
		);
	}
}