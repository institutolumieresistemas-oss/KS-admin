import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
    selector: 'app-modal-programar-salida',
    templateUrl: './modal-programar-salida.component.html',
    styleUrl: './modal-programar-salida.component.css',
    standalone: false
})
export class ModalProgramarSalidaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    salida: '',
  };
  @Input() modificar = false;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
