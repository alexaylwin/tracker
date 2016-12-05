import { Injectable } from '@angular/core';
import { Headers, Http, Response } from '@angular/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import 'rxjs/add/operator/toPromise';
import { Observable }     from 'rxjs/Observable';
import * as moment from 'moment';
import {UserService} from './user.service';
import { SERVICE_BASE_URL } from '../env/urls.env';

@Injectable()
export class RecentActivitiesService {

	private recentActivityServiceUrl:String = SERVICE_BASE_URL + '/recent-activities';

	private activityRecordServiceUrl:String = SERVICE_BASE_URL + '/recorded-activities';

	private userId:number = 1;
	
	constructor(private http: Http, private userService: UserService) {
		this.userId = userService.getCurrentUser().userId;
	}

	getRecentActivities(): Promise<ActivityRecord[]> {
		return this.http.get(this.recentActivityServiceUrl + "/" + this.userId)
			.toPromise()
			.then(response => response.json() as ActivityRecord[]);
	}

	addActivity(startTime:Date, endTime:Date, activityId:number): Promise<Boolean> {
		let startTimeString = moment(startTime).format();
		let endTimeString = moment(endTime).format();
		console.log("Sending activity to server");
		let putRequest = this.activityRecordServiceUrl + "/" + this.userId 
			+ "/" + startTimeString 
			+ "/" + endTimeString
			+ "/" + activityId;
		return this.http.put(putRequest, '')
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