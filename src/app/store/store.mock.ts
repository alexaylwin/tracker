import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

export class MockStore {
    dispatch(action: Action): void {}

    select(slice: string): Observable<any> {
        return Observable.of(true);
    }
}
