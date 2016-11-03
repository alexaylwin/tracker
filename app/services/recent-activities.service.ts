import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';

@Injectable()
export class RecentActivitiesService {
	//Remote test server
	//private activityServiceUrl = 'http://192.168.1.22/tracker-services/activities.php';

	//Local test server
	private recentActivityServiceUrl = 'http://localhost/tracker/recent-activities/1';
	
	constructor(private http: Http) {}

	getRecentActivities(): Promise<ActivityRecord[]> {
		return this.http.get(this.recentActivityServiceUrl)
			.toPromise()
			.then(response => response.json() as ActivityRecord[]);
	}
}