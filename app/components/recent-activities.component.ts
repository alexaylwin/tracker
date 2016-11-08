import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityRecord } from "../models/activity-record"
import { RecentActivitiesService } from '../services/recent-activities.service';

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
	
	constructor(private recentActivitiesService: RecentActivitiesService) {}
	
	ngOnInit(): void {
		this.getRecentActivities();
	}

	onTimerStopped(newActivity: ActivityRecord): void {
		console.log("caught timer stop: " + newActivity);
		this.recentActivities.push(newActivity);
	}

	getRecentActivities(): void {
		this.recentActivitiesService.getRecentActivities().then(
			recentActivities => {
				this.recentActivities = recentActivities;
			}
		);
	}
}