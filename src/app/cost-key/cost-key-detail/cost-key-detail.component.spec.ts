import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostKeyDetailComponent } from './cost-key-detail.component';

describe('CostKeyDetailComponent', () => {
  let component: CostKeyDetailComponent;
  let fixture: ComponentFixture<CostKeyDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostKeyDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostKeyDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
