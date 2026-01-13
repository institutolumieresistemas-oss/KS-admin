import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-datos-cliente',
    templateUrl: './datos-cliente.component.html',
    styleUrl: './datos-cliente.component.css',
    standalone: false
})
export class DatosClienteComponent {
  cliente = {
    festejado: '',
    edad: '',
    cantidad: '',
    nombre: '',
    celular: ''
  }
  @Output() siguiente = new EventEmitter();
  @Output() cancelar = new EventEmitter();

  constructor(){}

  ngOnInit(){}

  continuar(){
    this.siguiente.emit(this.cliente);
  }

  regresar(){
    this.siguiente.emit(this.cliente);
  }
}
