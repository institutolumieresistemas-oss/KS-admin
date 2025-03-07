import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-egreso-tipo',
  templateUrl: './modal-egreso-tipo.component.html',
  styleUrl: './modal-egreso-tipo.component.css'
})
export class ModalEgresoTipoComponent {
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
