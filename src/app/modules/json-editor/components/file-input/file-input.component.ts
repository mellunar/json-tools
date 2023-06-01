import { Component, ElementRef, Input, ViewChild, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-input',
  templateUrl: './file-input.component.html',
  styleUrls: ['./file-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FileInputComponent),
      multi: true,
    },
  ],
})
export class FileInputComponent implements ControlValueAccessor {
  @ViewChild('fileInput') fileInput: ElementRef;

  @Input() accept = '.json';
  @Input() label = 'Select a file';

  value: File;

  onChange: (value: File) => void = () => {};

  writeValue(event: any) {
    if (event) {
      const files = event.target.files;
      const file = files.item(0);

      this.value = file;
      this.onChange(file);
      this.fileInput.nativeElement.value = '';
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  registerOnTouched(fn: any) {}
}
