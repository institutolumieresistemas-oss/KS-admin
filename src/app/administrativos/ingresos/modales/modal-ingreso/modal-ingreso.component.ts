import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
    selector: 'app-modal-ingreso',
    templateUrl: './modal-ingreso.component.html',
    styleUrl: './modal-ingreso.component.css',
    standalone: false
})
export class ModalIngresoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    monto: '',
    concepto: '',
    idRubro: 0,
    idTipo: 0,
    idCalendario: 0,
    idFormaPago: 0,
    idCuenta: 0,
    observaciones: '',
    imagen: ''
  };
  @Input() listas = {
    conceptos: [],
    rubros: [],
    tipos: [],
    calendarios: [],
    formas: [],
    cuentas: []
  }
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
