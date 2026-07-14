import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-traspaso',
  templateUrl: './modal-traspaso.component.html',
  styleUrl: './modal-traspaso.component.css',
  standalone: false
})
export class ModalTraspasoComponent implements OnInit, OnChanges {
  @Input() origenAccount: any;
  @Input() listas: any = { formas: [], cuentas: [], calendarios: [] };
  @Output() emitidor = new EventEmitter<any>();

  dato = {
    idCuentaSaliente: 0,
    idCuentaEntrante: 0,
    monto: '0',
    idFormaPago: 0,
    idCalendario: 0
  };

  cuentasFiltradas: any[] = [];

  constructor(private generales: GeneralesService) {}

  ngOnInit(): void {
    this.inicializar();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['origenAccount'] || changes['listas']) {
      this.inicializar();
    }
  }

  inicializar() {
    if (this.origenAccount) {
      this.dato.idCuentaSaliente = this.origenAccount.id;
      
      const todasCuentas = this.listas.cuentas || [];
      this.cuentasFiltradas = todasCuentas.filter((c: any) => c.id.toString() !== this.origenAccount.id.toString());
    }
  }

  emitir() {
    const montoNum = parseFloat(this.dato.monto);
    if (isNaN(montoNum) || montoNum <= 0) {
      this.generales.mensajeError('Debe ingresar un monto mayor a cero');
      return;
    }
    if (!this.dato.idCuentaEntrante || this.dato.idCuentaEntrante === 0) {
      this.generales.mensajeError('Debe seleccionar la cuenta entrante');
      return;
    }
    if (!this.dato.idFormaPago || this.dato.idFormaPago === 0) {
      this.generales.mensajeError('Debe seleccionar la forma de pago');
      return;
    }
    if (!this.dato.idCalendario || this.dato.idCalendario === 0) {
      this.generales.mensajeError('Debe seleccionar el calendario');
      return;
    }
    this.emitidor.emit({
      ...this.dato,
      monto: montoNum
    });
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
