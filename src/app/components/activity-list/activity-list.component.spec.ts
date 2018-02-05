import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivityListComponent } from './activity-list.component';
import { FormsModule } from '@angular/forms';
import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import { Observable } from 'rxjs/Rx';
import { DebugElement } from '@angular/core/src/debug/debug_node';
import { By } from '@angular/platform-browser';

describe('ActivityListComponent', () => {
  let component: ActivityListComponent;
  let fixture: ComponentFixture<ActivityListComponent>;
  let debugElement: DebugElement;


  beforeEach(async(() => {
    const activityServiceStub: any = {
      getActivities: function(): Observable<Array<Activity>> {
        return Observable.of([new Activity()]);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ ActivityListComponent ],
      imports:[ FormsModule ],
      providers:[ {provide:ActivityService, useValue:activityServiceStub} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivityListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  // We expect the onChange method to trigger a value to be emitted
  // from the observable
  it('should emit a new value when changed', () => {
    let selectedActivity: Activity;
    debugElement = fixture.debugElement.query(By.css('select'));

    component.onSelectedActivity.subscribe((activity: Activity) => {
      selectedActivity = activity;
    });

    debugElement.triggerEventHandler('change', null);

    fixture.whenStable().then(() => {
      expect(selectedActivity.id).toBe(1);
    });
  });
});
