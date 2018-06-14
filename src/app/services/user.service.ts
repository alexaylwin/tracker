import { User } from '../models/user';
import { Injectable } from '@angular/core';
import { StateService } from './state.service';

@Injectable()
export class UserService {
	constructor(private stateService: StateService) {}

	getUserAuthHeader(): string {
		return 'Basic ' + this.stateService.currentUser.auth;
	}

	handleLogin(username: string, password: string) {
		const currentUser = new User();
		currentUser.username = username;
		currentUser.auth = btoa(username + ':' + password);
		currentUser.userId = 1;
		this.stateService.setCurrentUser(currentUser);
		this.stateService.setLoggedIn(true);
	}
}
