import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
    selector: 'app-modal-meta',
    templateUrl: './modal-meta.component.html',
    styleUrl: './modal-meta.component.css',
    standalone: false
})
export class ModalMetaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    meta: '',
    mes: 0,
    idCalendario: 0,
    idUsuario: 0
  };
  @Input() lista = {
    usuarios: [],
    calendarios: []
  };
  @Input() modificar = false;
  meses: any
  constructor(private generales: GeneralesService) { }
  
  ngOnInit(): void {
    this.meses = this.generales.meses;
  }
  
  emitir() {
    this.emitidor.emit(this.dato);
  }
  
  cerrar() {
    this.generales.cerrarModal();
  }
}
