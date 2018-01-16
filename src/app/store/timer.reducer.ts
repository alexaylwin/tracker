import { Action } from '@ngrx/store';

export interface AppState {
    timerRunning : boolean
}

export const initialState: AppState = {
    timerRunning: false
}

export const ACTIONS = {
    TIMER_START : 'start',
    TIMER_STOP : 'stop'
}

export function timerReducer(
    state: AppState = initialState,
    action: Action) : AppState
{
    switch (action.type) {
        case ACTIONS.TIMER_START:
            return { timerRunning: true };
        case ACTIONS.TIMER_STOP:
            return { timerRunning: false };
    }
}
