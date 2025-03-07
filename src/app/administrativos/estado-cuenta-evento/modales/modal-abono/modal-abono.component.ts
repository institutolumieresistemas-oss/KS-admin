import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-abono',
  templateUrl: './modal-abono.component.html',
  styleUrl: './modal-abono.component.css'
})
export class ModalAbonoComponent {
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
