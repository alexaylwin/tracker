import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { ActivityRecord } from '../../models/activity-record';
import { Observable } from 'rxjs/Rx';
import { Store } from '@ngrx/store';
import { MockStore } from '../../store/store.mock';


describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  const recentServiceStub: any = {
    getRecentActivities: function(): Observable<ActivityRecord>  {
      return Observable.of(new ActivityRecord());
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerComponent ],
      providers:[
        { provide:RecentActivitiesService, useValue:recentServiceStub },
        { provide:Store, useValue:new MockStore() }],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
