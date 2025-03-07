import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-semana',
  templateUrl: './modal-semana.component.html',
  styleUrl: './modal-semana.component.css'
})
export class ModalSemanaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
    idCalendario: 0,
    inicio: '',
    fin: ''
  };
  @Input() modificar = false;
  @Input() lista: any;
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
