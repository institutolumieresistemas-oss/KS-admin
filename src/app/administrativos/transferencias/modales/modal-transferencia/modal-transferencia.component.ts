import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-transferencia',
  standalone: false,
  templateUrl: './modal-transferencia.component.html',
  styleUrl: './modal-transferencia.component.css'
})
export class ModalTransferenciaComponent {
@Output() emitidor = new EventEmitter<any>();
@Input() dato = {
  monto: '',
  idSucursalEntrada: 0,
  idSucursalSalida: 1,
  idUsuarioCreo: localStorage.getItem('identificador')
};
@Input() listas = {
  sucursales: []
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
