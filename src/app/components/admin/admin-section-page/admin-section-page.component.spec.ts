import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSectionPageComponent } from './admin-section-page.component';

describe('AdminSectionPageComponent', () => {
  let component: AdminSectionPageComponent;
  let fixture: ComponentFixture<AdminSectionPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminSectionPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSectionPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
