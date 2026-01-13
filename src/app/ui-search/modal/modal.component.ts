import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    standalone: false
})
export class ModalComponent {
  @Input() size = 'lg';
}
