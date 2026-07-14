import { Component, Input, OnInit, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { GeneralesService } from '../../../../servicios/generales.service';

@Component({
  selector: 'app-modal-materiales-evento',
  templateUrl: './modal-materiales-evento.component.html',
  styleUrl: './modal-materiales-evento.component.css',
  standalone: false
})
export class ModalMaterialesEventoComponent implements OnInit, OnChanges {
  @Input() disponible: any;
  @Output() emitidor = new EventEmitter<any>();

  materiales: any[] = [];
  tipos: any[] = [];
  materialesFiltrados: any[] = [];
  filtroTipo = 0;

  constructor(private generales: GeneralesService) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['disponible']) {
      this.cargarDatos();
    }
  }

  cargarDatos() {
    if (this.disponible) {
      const rawMateriales = this.disponible.materiales || this.disponible.datos || [];
      this.tipos = this.disponible.tipos || this.disponible.lista || [];

      this.materiales = rawMateriales.map((m: any) => {
        const matchingTipo = this.tipos.find(t => t.id.toString() === m.idTipo.toString());
        return {
          ...m,
          tipo: matchingTipo ? matchingTipo.nombre : 'Sin tipo'
        };
      });

      this.filtrar(this.filtroTipo);
    }
  }

  filtrar(idTipo: any) {
    this.filtroTipo = Number(idTipo);
    if (this.filtroTipo === 0) {
      this.materialesFiltrados = this.materiales;
    } else {
      this.materialesFiltrados = this.materiales.filter(m => m.idTipo.toString() === this.filtroTipo.toString());
    }
  }

  agregar(material: any) {
    this.emitidor.emit(material);
  }

  cerrar() {
    this.generales.cerrarModal();
  }
}
