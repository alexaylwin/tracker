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

	constructor(private http: HttpClient, private stateService: StateService) {}

	getActivities(): Observable<Activity[]> {

		const requestOptions = {
			headers: new HttpHeaders({
				'Authorization': 'Basic ' + this.stateService.getCurrentUser().auth
			})
		}
		return this.http.get<Activity[]>(this.activityServiceUrl + '?userid=' + this.stateService.getCurrentUser().userId, requestOptions).pipe(
			//Use a map transform to switch from a Response to an Activity array
			map( (resp) => {
					let list: Activity[];
					list = resp;
					return list;
				})
			);
	}

}
