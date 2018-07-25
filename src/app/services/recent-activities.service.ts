import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';
import { Observable } from 'rxjs/Rx';
import { map, concatAll, concatMap } from 'rxjs/operators';
import * as moment from 'moment';
import { StateService } from './state.service';
import { SERVICE_BASE_URL } from '../../environments/environment';

interface ServiceActivityRecord {
	activityId: number;
	startTime: JavaDateTime;
	endTime: JavaDateTime;
}

interface JavaDateTime {
	year: number;
	monthValue: number;
	dayOfMonth: number;
	hour: number;
	minute: number;
	second: number;
	dayOfWeek: string
}

@Injectable()
export class RecentActivitiesService {

	private recentActivityServiceUrl: string = SERVICE_BASE_URL + '/activities/record?userid=';

	constructor(private http: HttpClient, private stateService: StateService) {}
	/** Convert the service activity record objects into local ones
		This algorithm should take the array of activity records returned by the service,
		and for each entry, convert it and emit it as a new record.
	**/
	getRecentActivities(): Observable<ActivityRecord> {
		console.log(this.stateService.getCurrentUser());
		const httpOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Basic ' + this.stateService.getCurrentUser().auth
			})
		}
		return this.http.get<ServiceActivityRecord[]>(this.recentActivityServiceUrl +
			this.stateService.getCurrentUser().userId.toString(), httpOptions).pipe(
			concatMap((response: ServiceActivityRecord[]) => {
				const ar: ActivityRecord[] = new Array();
				for (let i = 0; i < response.length; i++) {
					const record = new ActivityRecord();
					console.log(response[i]);
					record.activityId = response[i].activityId;
					const endTimeWrapper = moment(response[i].endTime, 'YYYY-MM-DD hh:mm:ss A');
					const startTimeWrapper = moment(response[i].startTime, 'YYYY-MM-DD hh:mm:ss A');
					record.endTime = endTimeWrapper.toDate();
					record.startTime = startTimeWrapper.toDate();
					console.log(record);
					ar.push(record);
				}
				return ar;
			}));
	}

	addActivity(newActivityRecord: ActivityRecord): Observable<Boolean> {

		//TODO: refactor this to send activity in the body
		const putRequest = this.recentActivityServiceUrl +
			this.stateService.getCurrentUser().userId.toString();
		const httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				'Authorization': 'Basic ' + this.stateService.getCurrentUser().auth
			})
		}
		return this.http.post(putRequest, ActivityRecord.serialize(newActivityRecord), httpOptions).map((resp) => true );
	}
}
