import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostKeyComponent } from './cost-key.component';

describe('CostKeyComponent', () => {
  let component: CostKeyComponent;
  let fixture: ComponentFixture<CostKeyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostKeyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostKeyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
