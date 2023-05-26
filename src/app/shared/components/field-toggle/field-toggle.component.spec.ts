import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FieldToggleComponent } from './field-toggle.component';

describe('FieldToggleComponent', () => {
  let component: FieldToggleComponent;
  let fixture: ComponentFixture<FieldToggleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FieldToggleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FieldToggleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
