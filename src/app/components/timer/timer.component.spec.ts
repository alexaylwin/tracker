import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerComponent } from './timer.component';
import { RecentActivitiesService } from '../../services/recent-activities.service';
import { StateService } from '../../services/state.service';

let recentActivitiesServiceStub = {};
let stateServiceStub = {};

describe('TimerComponent', () => {
  let component: TimerComponent;
  let fixture: ComponentFixture<TimerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimerComponent ],
      providers: [        
        {provide:RecentActivitiesService, useValue: recentActivitiesServiceStub},
        {provide:StateService, useValue: stateServiceStub}]
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
