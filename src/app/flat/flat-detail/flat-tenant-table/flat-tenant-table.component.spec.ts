import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatTenantTableComponent } from './flat-tenant-table.component';

describe('FlatTenantTableComponent', () => {
  let component: FlatTenantTableComponent;
  let fixture: ComponentFixture<FlatTenantTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatTenantTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatTenantTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
