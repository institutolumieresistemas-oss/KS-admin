import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-usuarios-notificacion',
  templateUrl: './modal-usuarios-notificacion.component.html',
  styleUrl: './modal-usuarios-notificacion.component.css'
})
export class ModalUsuariosNotificacionComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() lista: any;
  @Input() listado: any;
  final: any;
  dato = 0;
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    console.log(this.listado);
    this.final = this.generales.faltantes(this.listado, this.lista, 'idUsuario');
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
