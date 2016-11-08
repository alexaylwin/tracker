import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import {UserService} from './user.service';

@Injectable()
export class ActivityService {
	//Remote test server
	//private activityServiceUrl = 'http://192.168.1.22/tracker-services/activities.php';

	//Local test server
	private activityServiceUrl = 'http://localhost/tracker/activities';

	private userId: number = 1;
	
	constructor(private http: Http, private userService: UserService) {
		this.userId = userService.getCurrentUser().userId;
	}

	getActivities(): Promise<Activity[]>{
		// var newPromise: Promise<Activity[]>;
		// newPromise = new Promise((resolve, reject) => {
		// 	resolve(ACTIVITY_LIST);
		// });
		// return newPromise;
		return this.http.get(this.activityServiceUrl + "/" + this.userId)
			.toPromise()
			.then(response => response.json() as Activity[]);
	}
}