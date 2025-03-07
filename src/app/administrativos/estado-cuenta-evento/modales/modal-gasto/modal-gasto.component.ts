import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-gasto',
  templateUrl: './modal-gasto.component.html',
  styleUrl: './modal-gasto.component.css'
})
export class ModalGastoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    concepto: '',
    monto: '',
    idFormaPago: 0,
    idCuenta: 0
  };
  @Input() formas: any;
  @Input() cuentas: any;
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
