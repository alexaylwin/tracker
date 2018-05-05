import { Activity } from '../models/activity';
import { ActivityRecord } from '../models/activity-record';

export const ACTIVITY_LIST: Activity[] = [
	{id: 1, name:"Work"},
	{id: 2, name:"Fun"},
	{id: 3, name:"Exercise"},
	{id: 4, name:"Household"}
]

export const RECENT_ACTIVITY_LIST: ActivityRecord[] = [
	{startTime: new Date(),
		endTime: new Date(),
		duration: 120,
		activityId: 2 },
	{startTime: new Date(),
		endTime: new Date(),
		duration: 1900,
		activityId: 3 },
	{startTime: new Date(),
		endTime: new Date(),
		duration: 200,
		activityId: 4 }
]