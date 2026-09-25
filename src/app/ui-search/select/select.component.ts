import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';

@Component({
    selector: 'app-select',
    templateUrl: './select.component.html',
    styleUrl: './select.component.css',
    standalone: false
})
export class SelectComponent implements OnInit, OnChanges {
  @Input() id = '';
  @Input() etiqueta = '';
  @Input() datos: any;
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato: any = 0;
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['datos'] && this.dato !== undefined && this.dato !== null && this.dato !== 0 && this.dato !== '0') {
      const valorActual = this.dato;
      setTimeout(() => {
        this.dato = valorActual;
      }, 0);
    }
  }
}
