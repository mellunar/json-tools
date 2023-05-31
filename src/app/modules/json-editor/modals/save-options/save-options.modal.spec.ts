import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveOptionsModal } from './save-options.modal';

describe('SaveOptionsComponent', () => {
  let component: SaveOptionsModal;
  let fixture: ComponentFixture<SaveOptionsModal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SaveOptionsModal],
    }).compileComponents();

    fixture = TestBed.createComponent(SaveOptionsModal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
