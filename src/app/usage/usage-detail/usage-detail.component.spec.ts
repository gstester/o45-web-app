import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UsageDetailComponent } from './usage-detail.component';

describe('UsageDetailComponent', () => {
  let component: UsageDetailComponent;
  let fixture: ComponentFixture<UsageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UsageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
