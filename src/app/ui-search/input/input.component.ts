import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent {
  @Input() etiqueta = '';
  @Input() id = '';
  @Input() place = '';
  @Input() tipo = '';
  @Input() activo = false;
  @Input() valor = '';
  @Output() emitidor = new EventEmitter<string>();
  @Output() enter = new EventEmitter<string>();
  @Input() validacion = '';
  @Input() cantidad = 15000000;
  @Output() emitidorBlur = new EventEmitter<any>();
  @Input() min = '';
  @Input() max = '';
  @Input() obligatorio = false;
  @Input() mayusculas = false;

  constructor() { }

  ngOnInit() {
  }

  emitir() {
    this.valor = (this.mayusculas) ? this.valor.toUpperCase() : this.valor;
    this.emitidor.emit(this.valor);
  }

  validar(evento: any) {
    if(evento.keyCode === 13){
      this.enter.emit(this.valor);
    }else{
      switch (this.validacion) {
        case 'curp':
          if (this.valor !== undefined) {
            this.valor = this.valor.toUpperCase();
            if (this.valor.length === 18) {
              evento.returnValue = false;
            }
          }
          break;
        case 'rfc':
          if (this.valor !== undefined) {
            this.valor = this.valor.toUpperCase();
            if (this.valor.length === 13) {
              evento.returnValue = false;
            }
          }
          break;
        case 'numero':
          if (evento.keyCode < 48 || evento.keyCode > 57) {
            evento.returnValue = false;
          }
          if (this.valor !== undefined) {
            if (this.valor.length === this.cantidad) {
              evento.returnValue = false;
            }
          }
          break;
        case 'decimal':
          if ((evento.keyCode < 48 || evento.keyCode > 57) && evento.keyCode !== 46) {
            evento.returnValue = false;
          }
          if (this.valor !== undefined) {
            const separada = this.valor.split('.');
            if (separada.length === 2 && evento.keyCode === 46) {
              evento.returnValue = false;
            }
          }
          break;
        case 'porcentaje':
          if ((evento.keyCode < 48 || evento.keyCode > 57) && evento.keyCode !== 46 && evento.keyCode !== 36 && evento.keyCode !== 37) {
            evento.returnValue = false;
          }
          if(this.valor.endsWith('%')){
            evento.returnValue = false;
          }
          if(evento.keyCode === 36){
            if(this.valor.length > 0){
              evento.returnValue = false;
            }
            evento.returnValue = true;
          }
          if(evento.keyCode === 37){
            if(this.valor.includes('$')){
              evento.returnValue = false;
            }
            if(this.valor.length < 1){
              evento.returnValue = false;
            }
            evento.returnValue = true;
          }
          if (this.valor !== undefined) {
            const separada = this.valor.split('.');
            if (separada.length === 2 && evento.keyCode === 46) {
              evento.returnValue = false;
            }
          }
          break;
      }
    }
  }

  blur(): any{
    if (this.tipo === 'date') {
      this.emitidorBlur.emit(this.valor);
      return 0;
    }
    switch (this.validacion) {
      case 'rfc':
      case 'curp':
        this.valor = this.valor.toUpperCase();
        break;
    }
  }
}
