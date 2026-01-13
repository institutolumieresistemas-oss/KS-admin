import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-lider-evento',
  standalone: false,
  templateUrl: './modal-lider-evento.component.html',
  styleUrl: './modal-lider-evento.component.css'
})
export class ModalLiderEventoComponent {
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
