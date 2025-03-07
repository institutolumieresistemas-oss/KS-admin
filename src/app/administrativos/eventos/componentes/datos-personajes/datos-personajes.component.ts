import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-datos-personajes',
  templateUrl: './datos-personajes.component.html',
  styleUrl: './datos-personajes.component.css'
})
export class DatosPersonajesComponent {
  @Input() lista: any;
  listado: any;
  personajes = new Array();
  seleccion = 0;
  @Output() siguente = new EventEmitter();
  @Output() anterior = new EventEmitter();
  constructor(public generales:GeneralesService){}

  ngOnInit(){
    this.listado = this.generales.faltantes(this.personajes, this.lista, 'id');
  }

  agregar(){
    this.personajes = this.generales.agregarDatoArray(this.personajes, this.generales.dato(this.lista, this.seleccion));
    this.listado = this.generales.faltantes(this.personajes, this.lista, 'id');
    this.seleccion = 0;
  }

  eliminar(dato: any){
    this.personajes = this.generales.eliminarDatoArray(this.personajes, dato);
    this.listado = this.generales.faltantes(this.personajes, this.lista, 'id');
  }

  continuar(){
    this.siguente.emit(this.personajes);
  }

  cancelar(){
    this.anterior.emit(this.personajes);
  }
}
