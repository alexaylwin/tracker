import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import {ACTIVITY_LIST, RECENT_ACTIVITY_LIST} from './mock-activities';

@Injectable()
export class ActivityService {
	//Remote test server
	//private activityServiceUrl = 'http://192.168.1.22/tracker-services/activities.php';

	//Local test server
	private activityServiceUrl = 'http://localhost/tracker/activities/2';
	
	constructor(private http: Http) {}

	getActivities(): Promise<Activity[]>{
		// var newPromise: Promise<Activity[]>;
		// newPromise = new Promise((resolve, reject) => {
		// 	resolve(ACTIVITY_LIST);
		// });
		// return newPromise;
		return this.http.get(this.activityServiceUrl)
			.toPromise()
			.then(response => response.json() as Activity[]);
	}

	getRecentActivities(): Promise<ActivityRecord[]> {
		var newPromise: Promise<ActivityRecord[]>;
		newPromise = new Promise((resolve, reject) => {
			resolve(RECENT_ACTIVITY_LIST);
		});
		return newPromise;
	}
}