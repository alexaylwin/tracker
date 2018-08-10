import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { ActivitySelectorComponent } from './activity-selector.component';
import { ActivityService } from '../../services/activity.service';
import { StateService } from '../../services/state.service';
import { Observable } from 'rxjs/Rx';
import { Activity } from '../../models/activity';

describe('ActivitySelectorComponent', () => {
  let component: ActivitySelectorComponent;
  let fixture: ComponentFixture<ActivitySelectorComponent>;

  let activityServiceStub = {
    getActivities: () => Observable.of(Array.of(new Activity()))
  }

  let stateServiceStub = {
    userChanged$: Observable.of(true)
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActivitySelectorComponent ],
      imports: [ FormsModule ],
      providers: [
        {provide: ActivityService, useValue:activityServiceStub},
        {provide: StateService, useValue: stateServiceStub},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActivitySelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
