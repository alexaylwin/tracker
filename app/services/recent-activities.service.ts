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

	private activityRecordServiceUrl = 'http://localhost/tracker/record-activity';
	
	constructor(private http: Http) {}

	getRecentActivities(): Promise<ActivityRecord[]> {
		return this.http.get(this.recentActivityServiceUrl)
			.toPromise()
			.then(response => response.json() as ActivityRecord[]);

	}

	addActivity(userId:number, startTime:Date, endTime:Date, activityId:number): Promise<Boolean> {
		let startTimeString = startTime.format("yyyy-M-dTH:mm:ss-0000");
		let endTimeString = endTime.format("yyyy-M-dTH:mm:ss-0000");
		
		let putRequest = this.activityRecordServiceUrl + "/" + userId 
			+ "/" + startTimeString 
			+ "/" + endTimeString
			+ "/" + activityId;
		return this.http.put(putRequest, '')
			.toPromise()
			.then(() => true)
			.catch(() => false);
	}
}