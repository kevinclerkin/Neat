import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegLoginComponent } from './reg-login.component';

describe('RegLoginComponent', () => {
  let component: RegLoginComponent;
  let fixture: ComponentFixture<RegLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegLoginComponent]
    });
    fixture = TestBed.createComponent(RegLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
