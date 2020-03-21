import { async } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivitySelectorComponent } from './activity-selector.component';
import { ActivityService } from '../../services/activity.service';
import { StateService } from '../../services/state.service';
import { Observable, of } from 'rxjs';
import { Activity } from '../../models/activity';
import { take } from 'rxjs/operators';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';

fdescribe('ActivitySelectorComponent', () => {
  let component: ActivitySelectorComponent;
  const activityServiceSpy = jasmine.createSpyObj('ActivityService', ['getActivities']);
  const stateServiceSpy = jasmine.createSpyObj('StateService', 
    ['setSelectedActivity', 'setStartTime', 'getActivityStatus', 
      'setActivityStatus', 'setUserChanged', 'getUserChanged']);

  beforeAll( () => {
    component = new ActivitySelectorComponent(activityServiceSpy, stateServiceSpy);
    stateServiceSpy.getUserChanged.and.returnValue(of(true));
    activityServiceSpy.getActivities.and.returnValue(of([{},{}]));
  })

  it('should populate the activity list when the user changes', () => {
    expect(component.activityList$).toBeUndefined();
    component.ngOnInit();
    component.activityList$.pipe(take(1)).subscribe( (v:Array<Activity>) => {
      expect(v.length).toBe(2);
    })

  })

  it('should start the activity when the start button is clicked', () => {

  })

  it('should stop the activity when the stop button is clicked', () => {

  })
});
