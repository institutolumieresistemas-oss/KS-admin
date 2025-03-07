import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-modulo',
  templateUrl: './modal-modulo.component.html',
  styleUrl: './modal-modulo.component.css'
})
export class ModalModuloComponent {
  dato = {
    nombre: '',
    icono: ''
  }
  @Output() emitidor = new EventEmitter();

  constructor(){}

  emitir(){
    this.emitidor.emit(this.dato);
  }
}
