import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { EgresosService } from '../../servicios/egresos.service';

@Component({
  selector: 'app-egresos-auditorias',
  standalone: false,
  templateUrl: './egresos-auditorias.component.html',
  styleUrl: './egresos-auditorias.component.css'
})
export class EgresosAuditoriasComponent implements OnInit {
  
  configuracion: datatableConfig = {
    alias: ['Folio', 'Fecha', 'Beneficiario', 'Categoría', 'Forma de pago', 'Cuenta', 'Monto'],
    encabezados: ['folio', 'created_at', 'beneficiario', 'categoria', 'forma', 'cuenta', 'monto'],
    busqueda: true
  };

  datos: any[] = [];
  seleccion: any;
  vista: string = '';

  // --- Estado del Zoom ---
  scale: number = 1;
  translateX: number = 0;
  translateY: number = 0;
  isDragging: boolean = false;
  startX: number = 0;
  startY: number = 0;

  readonly scaleStep = 0.25;
  readonly maxScale = 4;
  readonly minScale = 0.5;

  constructor(
    private generales: GeneralesService, 
    private servicio: EgresosService
  ) {}

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros() {
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
    }, error => this.generales.interpretarError(error));
  }

  abrirVisor() {
    this.resetZoom();
    this.vista = 'voucher';
    this.generales.abrirModal();
  }

  auditar(){
    this.servicio.auditar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Egreso auditado correctamente');
      this.obtenerRegistros();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }

  cerrarModal() {
    this.generales.cerrarModal();
    setTimeout(() => this.vista = '', 300);
  }

  // --- Lógica de Zoom y Movimiento ---
  zoomIn() { this.setScale(this.scale + this.scaleStep); }
  zoomOut() { this.setScale(this.scale - this.scaleStep); }
  resetZoom() { this.scale = 1; this.translateX = 0; this.translateY = 0; }

  private setScale(value: number) {
    this.scale = Math.max(this.minScale, Math.min(this.maxScale, value));
    if (this.scale === 1) { this.translateX = 0; this.translateY = 0; }
  }

  onWheel(event: WheelEvent) {
    event.preventDefault();
    const delta = event.deltaY > 0 ? -this.scaleStep : this.scaleStep;
    this.setScale(this.scale + delta);
  }

  onMouseDown(event: MouseEvent) {
    if (this.scale <= 1) return;
    this.isDragging = true;
    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    this.translateX = event.clientX - this.startX;
    this.translateY = event.clientY - this.startY;
  }

  onMouseUp() { this.isDragging = false; }
}