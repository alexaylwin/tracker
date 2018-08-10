import { TestBed, async } from '@angular/core/testing';

import { AppComponent } from './app.component';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatDialog } from '@angular/material';
import { StateService } from '../services/state.service';
import { UserService } from '../services/user.service';

let stateServiceStub = {};
let userServiceStub = {};
let matDialogStub = {};

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [ NO_ERRORS_SCHEMA ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: MatDialog, useValue: matDialogStub},
        {provide:StateService, useValue: stateServiceStub},
        {provide:UserService, useValue: userServiceStub}
      ]
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
