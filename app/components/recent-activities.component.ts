import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Activity } from "../models/activity";
import { ActivityRecord } from "../models/activity-record"
import { RecentActivitiesService } from '../services/recent-activities.service';

@Component({
	selector: 'recent-activities',
	template: `
		<ul class="recent-activity-list">
			<li *ngFor="let recentActivity of recentActivities" class="latest">
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
	getRecentActivities(): void {
		this.recentActivitiesService.getRecentActivities().then(
			recentActivities => {
				this.recentActivities = recentActivities;
			}
		);
	}
}
