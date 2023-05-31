import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Modal } from '../../state/modal.interface';
import { ModalService } from '../../state/modal.service';

@Component({
  selector: 'app-modal-container',
  templateUrl: './modal-container.component.html',
  styleUrls: ['./modal-container.component.scss'],
})
export class ModalContainerComponent implements OnInit {
  modals$: Observable<Modal[]>;

  constructor(private modalService: ModalService) {}

  ngOnInit() {
    this.modals$ = this.modalService.modals$;
  }

  dismiss(index: number, data?: any) {
    this.modalService.dismiss(index, data);
  }
}
