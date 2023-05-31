import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { SharedModule } from 'src/app/shared/shared.module';

@Component({
  standalone: true,
  selector: 'app-save-options',
  templateUrl: './save-options.modal.html',
  styleUrls: ['./save-options.modal.scss'],
  imports: [CommonModule, ReactiveFormsModule, SharedModule],
})
export class SaveOptionsModal implements OnInit, OnDestroy {
  @Output() dismiss = new EventEmitter();

  form = new FormGroup({
    name: new FormControl<string>('', {
      validators: [Validators.required, Validators.pattern(/^[^<>:"\/\\|?*\x00-\x1F]*$/)],
    }),
    indentation: new FormControl<null | 'tabs' | 'spaces'>(null),
    spaces: new FormControl<number>(
      { value: null, disabled: true },
      { validators: [Validators.pattern(/[0-9]/g)] }
    ),
  });

  namePlaceholder = 'It must not contain  / : * ? " < > |';

  formSubscription: Subscription;

  ngOnInit() {
    this.formSubscription = this.form.get('indentation').valueChanges.subscribe((value) => {
      if (value === 'spaces') {
        const input = this.form.value.spaces;
        const valueToSet = input ? input : 2;

        this.form.get('spaces').setValidators(Validators.min(1));
        this.form.get('spaces').setValue(valueToSet);
        this.form.get('spaces').updateValueAndValidity;
        this.form.get('spaces').enable();
      } else {
        this.form.get('spaces').removeValidators(Validators.min(1));
        this.form.get('spaces').updateValueAndValidity;
        this.form.get('spaces').disable();
      }
    });
  }

  ngOnDestroy() {
    if (this.formSubscription) {
      this.formSubscription.unsubscribe();
    }
  }

  callDismiss(value?: any) {
    this.dismiss.emit(value);
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    const { value } = this.form;

    this.callDismiss(value);
  }
}
