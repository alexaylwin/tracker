import { Action } from '@ngrx/store';

export interface AppState {
    timerRunning : boolean
}

export const initialState: AppState = {
    timerRunning: false
}

export function timerReducer(
    state: AppState = initialState,
    action: Action) : AppState
{
    switch (action.type) {
        case "START_TIMER":
            console.log("timer started");
            return { timerRunning: true };
        case "STOP_TIMER":
            console.log("timer stopped");
            return { timerRunning: false };
    }
}
