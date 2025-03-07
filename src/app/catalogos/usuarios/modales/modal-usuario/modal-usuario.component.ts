import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-usuario',
  templateUrl: './modal-usuario.component.html',
  styleUrl: './modal-usuario.component.css'
})
export class ModalUsuarioComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    celular: '',
    idSucursal: 0,
    usuario: '',
    password: '',
    idTipoUsuario: 0
  };
  @Input() modificar = false;
  @Input() listas = {
    tipos: [],
    sucursales: []
  }
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
