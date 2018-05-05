import { Action } from '@ngrx/store';
import { ActivityRecord } from '../models/activity-record';

export interface AppState {
    timerRunning: boolean
    recordedActivities: Array<ActivityRecord>
}

export const initialState: AppState = {
    timerRunning: false,
    recordedActivities: null
}

export function timerReducer(
    state: AppState = initialState,
    action: Action): AppState {
    switch (action.type) {
        case "START_TIMER":
            console.log("timer started");
            return { timerRunning: true };
        case "STOP_TIMER":
            console.log("timer stopped");
            return { timerRunning: false };
    }
}

export function activityRecordReducer (
    state: AppState = initialState,
    action: Action): AppState {
    switch (action.type) {
        default:
            return state;
    }
}



