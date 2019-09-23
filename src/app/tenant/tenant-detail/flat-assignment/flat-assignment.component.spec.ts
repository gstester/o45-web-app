import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatAssignmentComponent } from './flat-assignment.component';

describe('FlatAssignmentComponent', () => {
  let component: FlatAssignmentComponent;
  let fixture: ComponentFixture<FlatAssignmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatAssignmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatAssignmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
