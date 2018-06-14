import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { map, concatAll } from 'rxjs/operators';
import { Activity } from '../models/activity';
import { StateService } from './state.service';
import { SERVICE_BASE_URL } from '../../environments/environment';

@Injectable()
export class ActivityService {
	//Local test server
	private activityServiceUrl = SERVICE_BASE_URL + '/activities';

	private userId: number = 1;

	constructor(private http: HttpClient, private stateService: StateService) {
		this.userId = this.stateService.currentUser.userId;
	}

	getActivities(): Observable<Activity[]> {

		const requestOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Basic ' + this.stateService.currentUser.auth
			})
		}
		return this.http.get<Activity[]>(this.activityServiceUrl + '?userid=' + this.userId, requestOptions).pipe(
			//Use a map transform to switch from a Response to an Activity array
			map( (resp) => {
					let list: Activity[];
					list = resp;
					return list;
				})
			);
	}

}
