import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-equipo-evento',
  standalone: false,
  templateUrl: './modal-equipo-evento.component.html',
  styleUrl: './modal-equipo-evento.component.css'
})
export class ModalEquipoEventoComponent {
  @Input() personajeEvento: any;
  @Output() emitidor = new EventEmitter();
  actor: any;

  constructor(private generales: GeneralesService){}

  ngOnInit(){
    console.log(this.personajeEvento);
  }

  emitir(){
    this.emitidor.emit(this.personajeEvento);
  }

  cerrar(){
    this.generales.cerrarModal();
  }
}
