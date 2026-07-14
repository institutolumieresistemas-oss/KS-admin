import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-material-tipo',
  templateUrl: './modal-material-tipo.component.html',
  styleUrl: './modal-material-tipo.component.css',
  standalone: false
})
export class ModalMaterialTipoComponent implements OnInit {
  @Output() emitidor = new EventEmitter<any>();
  @Input() dato = {
    nombre: '',
  };
  @Input() modificar = false;

  constructor(private generales: GeneralesService) {}

  ngOnInit(): void {}

  emitir() {
    this.emitidor.emit(this.dato);
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
