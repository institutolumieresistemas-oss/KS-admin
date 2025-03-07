import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-lider',
  templateUrl: './modal-lider.component.html',
  styleUrl: './modal-lider.component.css'
})
export class ModalLiderComponent {
  @Input() lider = '';
  @Output() emitidor = new EventEmitter();
  constructor(private generales: GeneralesService){}

  emitir(){
    this.emitidor.emit(this.lider);
  }

  cerrar(){
    this.generales.cerrarModal();
  }
}
