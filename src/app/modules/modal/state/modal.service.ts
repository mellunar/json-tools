import { Injectable, Type } from '@angular/core';
import { BehaviorSubject, Observable, Subject, filter, map, take } from 'rxjs';
import { Modal } from './modal.interface';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  modals$ = new BehaviorSubject<Modal[]>([]);
  dismissed = new Subject<{ id: number; data: any }>();
  body = document.querySelector('body');

  constructor() {}

  create(component: Type<any>, props?: any) {
    const id = Date.now();
    const modalRef = new Modal(component, id, props);

    const modals = this.modals$.value;
    modals.push(modalRef);

    this.modals$.next(modals);

    this.body.style.overflow = modals.length > 0 ? 'hidden' : 'initial';

    return {
      onDismiss: new Promise((resolve) => {
        this.dismissed
          .pipe(
            filter((modal) => modal.id === id),
            take(1)
          )
          .subscribe((modal) => resolve(modal.data));
      }),
    };
  }

  dismiss(index: number, data?: any) {
    const modals = this.modals$.value;
    const removed = modals.splice(index, 1);

    this.dismissed.next({ id: removed[0].id, data });
    this.modals$.next(modals);

    this.body.style.overflow = modals.length > 0 ? 'hidden' : 'initial';
  }
}
