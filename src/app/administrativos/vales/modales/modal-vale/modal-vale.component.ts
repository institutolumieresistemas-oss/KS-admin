import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-vale',
  standalone: false,
  templateUrl: './modal-vale.component.html',
  styleUrl: './modal-vale.component.css'
})
export class ModalValeComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    monto: ''
  };
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
