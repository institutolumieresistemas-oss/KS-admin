import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-sucursal',
  templateUrl: './modal-sucursal.component.html',
  styleUrl: './modal-sucursal.component.css'
})
export class ModalSucursalComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    domicilio: '',
    telefono: '',
    abreviatura: ''
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
