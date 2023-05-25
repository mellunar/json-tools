import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JsonEditorPage } from './json-editor.page';

describe('JsonEditorComponent', () => {
  let component: JsonEditorPage;
  let fixture: ComponentFixture<JsonEditorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JsonEditorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(JsonEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
