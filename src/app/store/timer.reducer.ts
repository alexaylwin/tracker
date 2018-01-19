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

export const ACTIONS: any = {
    TIMER_START : 'start',
    TIMER_STOP : 'stop'
}

export function timerReducer(
    state: AppState = initialState,
    action: Action): AppState {
    switch (action.type) {
        case ACTIONS.TIMER_START:
            return { timerRunning: true, recordedActivities: state.recordedActivities };
        case ACTIONS.TIMER_STOP:
            return { timerRunning: false, recordedActivities: state.recordedActivities };
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



