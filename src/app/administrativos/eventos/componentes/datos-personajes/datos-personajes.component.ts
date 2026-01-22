import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
    selector: 'app-datos-personajes',
    templateUrl: './datos-personajes.component.html',
    styleUrl: './datos-personajes.component.css',
    standalone: false
})
export class DatosPersonajesComponent {
  @Input() lista: any;
  @Input() personajes = new Array();
  @Output() siguente = new EventEmitter();
  @Output() anterior = new EventEmitter();
  constructor(public generales:GeneralesService){}

  ngOnInit(){}

  continuar(){
    this.siguente.emit(this.personajes);
  }

  cancelar(){
    this.anterior.emit(this.personajes);
  }
}
