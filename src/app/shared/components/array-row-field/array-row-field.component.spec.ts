import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrayRowFieldComponent } from './array-row-field.component';

describe('ArrayRowFieldComponent', () => {
  let component: ArrayRowFieldComponent;
  let fixture: ComponentFixture<ArrayRowFieldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArrayRowFieldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArrayRowFieldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
