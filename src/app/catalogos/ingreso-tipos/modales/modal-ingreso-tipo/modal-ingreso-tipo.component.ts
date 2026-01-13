import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
    selector: 'app-modal-ingreso-tipo',
    templateUrl: './modal-ingreso-tipo.component.html',
    styleUrl: './modal-ingreso-tipo.component.css',
    standalone: false
})
export class ModalIngresoTipoComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    idRubro: 0,
  };
  @Input() lista: any;
  @Input() modificar = false;
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
