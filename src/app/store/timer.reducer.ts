import { Action } from '@ngrx/store';

export interface AppState {
    timerRunning : boolean
}

export const ACTIONS = {
    TIMER_START : 'start',
    TIMER_STOP : 'stop'
}

export function timerReducer(
    state: boolean = false,
    action: Action) : boolean
{
    switch (action.type) {
        case ACTIONS.TIMER_START:
            return true;
        case ACTIONS.TIMER_STOP:
            return false;
    }
}
