import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-equipo',
  templateUrl: './modal-equipo.component.html',
  styleUrl: './modal-equipo.component.css'
})
export class ModalEquipoComponent {
  @Input() equipo = '';
  @Output() emitidor = new EventEmitter();

  constructor(private generales: GeneralesService){}

  emitir(){
    this.emitidor.emit(this.equipo);
  }

  cerrar(){
    this.generales.cerrarModal();
  }
}
