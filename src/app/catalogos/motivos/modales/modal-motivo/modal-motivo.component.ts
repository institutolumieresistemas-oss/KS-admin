import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-motivo',
  templateUrl: './modal-motivo.component.html',
  styleUrl: './modal-motivo.component.css'
})
export class ModalMotivoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
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
