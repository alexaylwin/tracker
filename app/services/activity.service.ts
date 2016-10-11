import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Activity } from '../models/activity';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import {ACTIVITY_LIST} from './mock-activities';

@Injectable()
export class ActivityService {

	private activityServiceUrl = 'http://192.168.1.22/tracker/activities.php';

	constructor(private http: Http) {}

	getActivities(): Promise<Activity[]> {
		return this.http.get(this.activityServiceUrl)
			.toPromise()
			.then(response => response.json() as Activity[]));
		//return Promise.resolve(ACTIVITY_LIST);
	}
}