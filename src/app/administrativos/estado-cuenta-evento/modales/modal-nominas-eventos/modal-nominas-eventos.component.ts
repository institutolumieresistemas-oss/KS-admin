import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-nominas-eventos',
  templateUrl: './modal-nominas-eventos.component.html',
  styleUrl: './modal-nominas-eventos.component.css',
  standalone: false
})
export class ModalNominasEventosComponent implements OnInit {
  @Input() formas: any;
  @Input() cuentas: any;
  @Input() actores: any[] = [];
  @Output() emitidor = new EventEmitter<any>();

  idFormaPago = 0;
  idCuenta = 0;
  total = 0;

  constructor(public generales: GeneralesService) {}

  ngOnInit(): void {
    this.calcularTotal();
  }

  parseMonto(val: string): number {
    const num = parseFloat(val);
    return isNaN(num) ? 0 : num;
  }

  actualizarMonto(actor: any, val: string) {
    actor.monto = this.parseMonto(val);
    this.calcularTotal();
  }

  calcularTotal() {
    this.total = this.actores.reduce((acc, a) => acc + (a.monto || 0), 0);
  }

  emitir() {
    if (this.generales.validarEntero(this.idFormaPago)) {
      this.generales.mensajeError('No se ha seleccionado la forma de pago');
      return;
    }
    if (this.generales.validarEntero(this.idCuenta)) {
      this.generales.mensajeError('No se ha seleccionado la cuenta');
      return;
    }
    if (this.total <= 0) {
      this.generales.mensajeError('Debe ingresar al menos un monto para la nómina');
      return;
    }

    const details = this.actores
      .filter(a => (a.monto || 0) > 0)
      .map(a => `${a.nombre}(${a.monto})`)
      .join(', ');

    const concepto = `Nómina - ${details}`;

    this.emitidor.emit({
      concepto: concepto,
      monto: this.total,
      idFormaPago: this.idFormaPago,
      idCuenta: this.idCuenta
    });
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
