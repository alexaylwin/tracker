import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import { Observable } from 'rxjs/Rx';
import { map, concatAll, concatMap } from 'rxjs/operators';
import * as moment from 'moment';
import {UserService} from './user.service';
import { SERVICE_BASE_URL } from '../../environments/environment';

interface ServiceActivityRecord {
	activityId:number;
	startTime: JavaDateTime;
	endTime: JavaDateTime;
}

interface JavaDateTime {
	year:number;
	monthValue:number;
	dayOfMonth:number;
	hour:number;
	minute:number;
	second:number;
	dayOfWeek:string
}

@Injectable()
export class RecentActivitiesService {

	private recentActivityServiceUrl:string = SERVICE_BASE_URL + '/activities/record?userid=';

	private userId:number = 1;
	
	constructor(private http: HttpClient, private userService: UserService) {
		this.userId = userService.getCurrentUser().userId;
		this.recentActivityServiceUrl = this.recentActivityServiceUrl + this.userId.toString();
	}
	/** Convert the service activity record objects into local ones
		This algorithm should take the array of activity records returned by the service,
		and for each entry, convert it and emit it as a new record.
	**/
	getRecentActivities(): Observable<ActivityRecord> {
		return this.http.get<ServiceActivityRecord[]>(this.recentActivityServiceUrl).pipe(
			concatMap((response:ServiceActivityRecord[]) => {
				let ar: ActivityRecord[] = new Array();
				for(let i = 0; i < response.length; i++) {
					let record = new ActivityRecord();
					console.log(response[i]);
					record.activityId = response[i].activityId;
					let endTimeWrapper = moment(response[i].endTime, 'YYYY-DD-MM hh:mm:ss A');
					let startTimeWrapper = moment(response[i].startTime, 'YYYY-DD-MM hh:mm:ss A');
					record.endTime = endTimeWrapper.toDate();
					record.startTime = startTimeWrapper.toDate();
					// record.endTime.setDate(response[i].endTime.dayOfMonth);
					// record.endTime.setMonth(response[i].endTime.monthValue);
					// record.endTime.setFullYear(response[i].endTime.year);
					// record.endTime.setHours(response[i].endTime.hour);
					// record.endTime.setMinutes(response[i].endTime.minute);
					// record.endTime.setSeconds(response[i].endTime.second);

					// record.startTime.setDate(response[i].startTime.dayOfMonth);
					// record.startTime.setMonth(response[i].startTime.monthValue);
					// record.startTime.setFullYear(response[i].startTime.year);
					// record.startTime.setHours(response[i].startTime.hour);
					// record.startTime.setMinutes(response[i].startTime.minute);
					// record.startTime.setSeconds(response[i].startTime.second);
					console.log(record);
					ar.push(record);
				}
				return ar;
			}));
	}

	addActivity(newActivityRecord:ActivityRecord): Observable<Boolean> {
//		let startTimeString = moment(newActivityRecord.startTime).format();
//		let endTimeString = moment(newActivityRecord.endTime).format();

		console.log("Sending activity to server");
		//TODO: refactor this to send activity in the body
		let putRequest = this.recentActivityServiceUrl;
		let httpOptions = {
			headers: new HttpHeaders({
				'Content-Type':'application/json'
			})
		}
		return this.http.post(putRequest, ActivityRecord.serialize(newActivityRecord), httpOptions).map((resp) => { return true; });
	}
}