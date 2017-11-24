import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import * as moment from 'moment';
import {UserService} from './user.service';
import { SERVICE_BASE_URL } from '../../environments/environment';

@Injectable()
export class RecentActivitiesService {

	private recentActivityServiceUrl:string = SERVICE_BASE_URL + '/activities/record/';

	private userId:number = 1;
	
	constructor(private http: Http, private userService: UserService) {
		this.userId = userService.getCurrentUser().userId;
		this.recentActivityServiceUrl = this.recentActivityServiceUrl + this.userId.toString();
	}

	getRecentActivities(): Promise<ActivityRecord[]> {
		return this.http.get(this.recentActivityServiceUrl)
			.toPromise()
			.then(response => response.json() as ActivityRecord[]);
	}

	addActivity(startTime:Date, endTime:Date, activityId:number): Promise<Boolean> {
		let startTimeString = moment(startTime).format();
		let endTimeString = moment(endTime).format();
		console.log("Sending activity to server");
		//TODO: refactor this to send activity in the body
		let putRequest = this.recentActivityServiceUrl
			+ "/" + startTimeString 
			+ "/" + endTimeString
			+ "/" + activityId;
		return this.http.post(putRequest, '')
			.toPromise()
			.then(
				function(response:Response) {
					console.log(response.status);
					return true;
				}
			)
			.catch(() => false);
	}
}