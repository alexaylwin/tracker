import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import { Observable } from 'rxjs/Rx';
import { map, concatAll } from 'rxjs/operators';
import * as moment from 'moment';
import {UserService} from './user.service';
import { SERVICE_BASE_URL } from '../../environments/environment';

@Injectable()
export class RecentActivitiesService {

	private recentActivityServiceUrl:string = SERVICE_BASE_URL + '/activities/record/';

	private userId:number = 1;
	
	constructor(private http: HttpClient, private userService: UserService) {
		this.userId = userService.getCurrentUser().userId;
		this.recentActivityServiceUrl = this.recentActivityServiceUrl + this.userId.toString();
	}

	getRecentActivities(): Observable<ActivityRecord> {
		return this.http.get<ActivityRecord>(this.recentActivityServiceUrl).pipe(
			map((response) => {
				return response;
			})
			, concatAll());

		// return this.http.get(this.recentActivityServiceUrl)
		// 	.map((resp:Response) => {
		// 		let activityRecordList:ActivityRecord[];
		// 		//TODO: This should use ActivityRecord.serialize for type safety
		// 		activityRecordList = resp.json() as ActivityRecord[];
		// 		activityRecordList.forEach(record => {
		// 			return record;
		// 		});
		// 		//return activityRecordList;
		// 	});
	}

	addActivity(newActivityRecord:ActivityRecord): Observable<Boolean> {
//		let startTimeString = moment(newActivityRecord.startTime).format();
//		let endTimeString = moment(newActivityRecord.endTime).format();

		console.log("Sending activity to server");
		//TODO: refactor this to send activity in the body
		let putRequest = this.recentActivityServiceUrl;
		return this.http.post(putRequest, newActivityRecord).map((resp) => { return true; });
	}
}