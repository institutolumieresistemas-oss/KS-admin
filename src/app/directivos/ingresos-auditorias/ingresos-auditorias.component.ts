import { Component, OnInit } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import { GeneralesService } from '../../servicios/generales.service';
import { IngresosService } from '../../servicios/ingresos.service';
import { PdfService } from '../../servicios/pdf.service';

@Component({
  selector: 'app-ingresos-auditorias',
  standalone: false,
  templateUrl: './ingresos-auditorias.component.html',
  styleUrl: './ingresos-auditorias.component.css'
})
export class IngresosAuditoriasComponent implements OnInit {
  
  configuracion: datatableConfig = {
    alias: ['Folio', 'Fecha', 'Rubro', 'Concepto', 'Forma de pago', 'Monto', 'Estatus'],
    encabezados: ['folio', 'created_at', 'rubro', 'concepto', 'forma', 'monto', 'estatus'],
    busqueda: true
  };

  datos: any[] = [];
  seleccion: any;
  vista: string = '';
  cargandoVoucher: boolean = false;

  // --- Variables de Estado del Zoom ---
  scale: number = 1;         // Escala actual (1 = 100%)
  translateX: number = 0;    // Posición X
  translateY: number = 0;    // Posición Y
  isDragging: boolean = false; // ¿Está el usuario arrastrando?
  startX: number = 0;        // Punto de inicio X del arrastre
  startY: number = 0;        // Punto de inicio Y del arrastre

  // Configuraciones del zoom
  readonly scaleStep = 0.25;  // Cuánto zoom hace cada clic/rueda
  readonly maxScale = 4;      // Zoom máximo (400%)
  readonly minScale = 0.5;    // Zoom mínimo (50%)

  constructor(
    private generales: GeneralesService, 
    private servicio: IngresosService
  ) {}

  ngOnInit(): void {
    this.obtenerRegistros();
  }

  obtenerRegistros() {
    this.servicio.mostrar().subscribe((respuesta: any) => {
      this.datos = respuesta.datos;
    }, error => {
      this.generales.interpretarError(error);
    });
  }

  abrirVisor() {
    this.resetZoom(); // Asegurar que abre sin zoom previo
    this.vista = 'voucher';
    this.generales.abrirModal();
    if (this.seleccion && !this.seleccion.imagen && this.seleccion.id) {
      this.cargandoVoucher = true;
      this.servicio.voucher(this.seleccion.id).subscribe((res: any) => {
        if (res && res.imagen) {
          this.seleccion.imagen = res.imagen;
        }
        this.cargandoVoucher = false;
      }, err => {
        this.cargandoVoucher = false;
      });
    }
  }

  cerrarModal() {
    this.generales.cerrarModal();
    // Limpiamos la vista después de un delay para que no se vea el cambio antes de cerrar
    setTimeout(() => this.vista = '', 300);
  }

  // --- Lógica Matemática del Zoom y Arrastre ---

  // 1. Zoom con botones
  zoomIn() {
    this.setScale(this.scale + this.scaleStep);
  }

  zoomOut() {
    this.setScale(this.scale - this.scaleStep);
  }

  resetZoom() {
    this.scale = 1;
    this.translateX = 0;
    this.translateY = 0;
  }

  // Función auxiliar para limitar la escala
  private setScale(value: number) {
    this.scale = Math.max(this.minScale, Math.min(this.maxScale, value));
    // Si volvemos a 100%, centramos
    if (this.scale === 1) {
      this.translateX = 0;
      this.translateY = 0;
    }
  }

  // 2. Zoom con la rueda del mouse (Wheel)
  onWheel(event: WheelEvent) {
    event.preventDefault(); // Evita que la página haga scroll
    const delta = event.deltaY > 0 ? -this.scaleStep : this.scaleStep;
    this.setScale(this.scale + delta);
  }

  // 3. Lógica de arrastre (Pan)
  onMouseDown(event: MouseEvent) {
    // Solo arrastrar si hay zoom o la imagen es más grande que el contenedor
    if (this.scale <= 1 && !this.imagenEsMasGrandeQueContenedor(event)) return;
    
    this.isDragging = true;
    // Calculamos el punto de inicio relativo a la posición actual
    this.startX = event.clientX - this.translateX;
    this.startY = event.clientY - this.translateY;
  }

  onMouseMove(event: MouseEvent) {
    if (!this.isDragging) return;
    event.preventDefault();
    // Calculamos la nueva posición
    this.translateX = event.clientX - this.startX;
    this.translateY = event.clientY - this.startY;
  }

  onMouseUp() {
    this.isDragging = false;
  }

  // Función opcional para verificar si la imagen necesita arrastre
  private imagenEsMasGrandeQueContenedor(event: MouseEvent): boolean {
    const container = event.currentTarget as HTMLElement;
    const img = container.querySelector('img');
    if (!img) return false;
    return img.offsetWidth > container.offsetWidth || img.offsetHeight > container.offsetHeight;
  }

  auditar(){
    this.servicio.auditar(this.seleccion).subscribe((respuesta: any) => {
      this.generales.mensajeCorrecto('Ingreso auditado correctamente')
      this.obtenerRegistros();
    },
    error => {
      this.generales.interpretarError(error);
    });
  }
}