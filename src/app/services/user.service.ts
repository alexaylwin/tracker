import { User } from '../models/user';
import { Injectable } from '@angular/core';

const MOCK_USER: User = {id: 1, name: "Alex"};

@Injectable()
export class UserService {
		
	getCurrentUser():User {
		return MOCK_USER;
	}
}