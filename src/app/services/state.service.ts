import { Injectable } from '@angular/core';
import { Activity } from '../models/activity';
import { User } from '../models/user'
import { Observable } from 'rxjs/Observable';
import { EventEmitter } from '@angular/core';

const MOCK_USER: User = {userId: 1, username: 'Alex', auth: ''};

@Injectable()
export class StateService {

  selectedActivity: Activity = null;
  private currentUser: User;

  loggedInEvt: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.retrieveState();
  }

  setSelectedActivity(newActivity: Activity) {
    this.selectedActivity = newActivity;
  }

  isLoggedIn() {
    if (this.getCurrentUser() !== null && this.getCurrentUser() !== undefined) {
      return true;
    }
    return false;
  }

  setCurrentUser(newUser: User) {
    this.currentUser = newUser;
    localStorage.setItem('user', JSON.stringify(newUser));
    this.loggedInEvt.emit(true);
  }

  getCurrentUser() {
    if (this.currentUser === undefined || this.currentUser == null) {
      this.currentUser = this.getFromLocalStorage('user');
    }
    return this.currentUser;
  }

  //Saturate the application state from local storage or cookies
  private retrieveState() {
    this.getCurrentUser();
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
