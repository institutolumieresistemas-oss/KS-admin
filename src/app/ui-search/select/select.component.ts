import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrl: './select.component.css'
})
export class SelectComponent {
  @Input() id = '';
  @Input() etiqueta = '';
  @Input() datos: any;
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = 0;
  @Input() activo = false;
  @Input() des = false;
  @Input() obligatorio = false;
  @Input() frist = true;
  existe = false;
  constructor(private generales: GeneralesService) { }

  ngOnInit() {
  }

  emitir() {
    this.emitidor.emit(this.dato);
  }

  validarDescripcion(descripcion: any){
    return !this.generales.validarString(descripcion);;
  }

  ngOnChange() {}
}
