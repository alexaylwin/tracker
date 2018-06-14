import {User} from '../models/user';
import { Injectable } from '@angular/core';

const MOCK_USER: User = {userId: 1, username: 'Alex'};

@Injectable()
export class UserService {

	getCurrentUser(): User {
		return MOCK_USER;
	}
}
