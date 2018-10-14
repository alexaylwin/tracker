import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { User } from '../models/user'
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

const MOCK_USER: User = {userId: 1, username: 'Alex', auth: ''};

@Injectable()
export class StateService {

  //should this also be an observable for consistency?
  selectedActivity: Activity = null;
  private currentUser: User;
  private stateRetrieved: boolean = false;

  //should these be wrapped in an accessor function? Probably
  activityStatus$: BehaviorSubject<string>;
  userChanged$: BehaviorSubject<boolean>;

  constructor() {
    this.retrieveState();
    //Set up a subscription to save the activity state into local storage
    //whenever an activity is changed
    this.activityStatus$.subscribe((newStatus: string) => {
      this.saveToLocalStorage('activityStatus', newStatus);
      this.saveToLocalStorage('selectedActivity', this.selectedActivity);
    });
  }

  setSelectedActivity(newActivity: Activity) {
    this.selectedActivity = newActivity;
  }

  isLoggedIn(): boolean {
    if (this.stateRetrieved) {
      if (this.currentUser !== undefined && this.currentUser !== null) {
        return true;
      }
    }
    return false;
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
    this.userChanged$.next(true);
  }

  getCurrentUser() {
    return this.currentUser;
  }

  //Saturate the application state from local storage or cookies
  private retrieveState() {

    this.userChanged$ = new BehaviorSubject<boolean>(false);
    this.currentUser = this.getFromLocalStorage('user');

    if (this.currentUser !== undefined && this.currentUser !== null) {
      this.stateRetrieved = true;
      this.userChanged$.next(true);
    }

    const activity: Activity = this.getFromLocalStorage('selectedActivity');
    if (activity !== undefined && activity !== null) {
      this.selectedActivity = activity;
    } else {
      this.selectedActivity = null;
    }

    const status: string = this.getFromLocalStorage('activityStatus');
    if (status !== undefined && status !== null) {
      this.activityStatus$ = new BehaviorSubject<string>(status);
    } else {
      this.activityStatus$ = new BehaviorSubject<string>('unselected');
    }

  }

  private getFromLocalStorage(key: string): any {
    const obj: string = localStorage.getItem(key);

    if (obj === undefined || obj === '') {
      return null;
    } else {
      return JSON.parse(obj);
    }
  }

  private saveToLocalStorage(key: string, obj: any) {
    localStorage.setItem(key, JSON.stringify(obj));
  }
}
