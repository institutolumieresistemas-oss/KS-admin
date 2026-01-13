import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { datatableConfig } from '../../interfaces/tables.interface';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
    selector: 'app-tabla',
    templateUrl: './tabla.component.html',
    styleUrl: './tabla.component.css',
    standalone: false
})
export class TablaComponent {
  @Output() emitidor = new EventEmitter<any>();
  @Output() doble = new EventEmitter<any>();
  @Input() configuracion: datatableConfig = {
    alias: [''],
    encabezados: ['']
  }
  @Input() datos: any;
  listado = new Array<any>();
  indiceOrden: any;
  ordenASC = false;
  numeros = [
    { id: 5, nombre: 5},
    { id: 10, nombre: 10},
    { id: 25, nombre: 25},
    { id: 50, nombre: 50}
  ]
  numeroFilas = 5;
  numeroPaginas = 0;
  paginaSeleccionada = 1;
  respaldo: any;
  totalDatos = 0;
  constructor() {}

  ngOnInit(): void {
    this.configuracion.ordenFilas = (this.configuracion.ordenFilas === undefined) ? true : this.configuracion.ordenFilas;
    this.configuracion.busqueda = (this.configuracion.busqueda === undefined) ? true : this.configuracion.busqueda;
    if(this.datos !== undefined && this.datos.length > 0){
      this.configurar();
    }
  }

  esIcono(icono: any): boolean{
    let incluye = false;
    if(icono !== null && icono !== undefined){
      incluye = (icono.toString().includes('fas fa') || icono.toString().includes('fab fa'));
    }
    return incluye
  }

  esColor(color: any): boolean{
    let incluye = false;
    if(color !== undefined && color !== null){
      incluye = (color.toString().includes('text-'));  
    }
    return incluye;
  }

  configurar(){
    if(this.configuracion.numeroFilas !== undefined){
      this.numeros = [];
      this.configuracion.numeroFilas.forEach((numero: any) => {
        this.numeros.push({ id: numero, nombre: numero});
      });
      this.numeroFilas = this.configuracion.numeroFilas[0];
    }
    this.configurarPaginacion();
  }

  configurarPaginacion(){
    let totalDatos = (this.datos !== undefined) ? this.datos.length : 0;
    let resultado = totalDatos / this.numeroFilas;
    let total = parseInt(resultado.toString());
    let modulo = totalDatos % this.numeroFilas;
    total = (modulo > 0) ? total+1 : total;
    this.numeroPaginas = total;
    if(this.numeroPaginas < this.paginaSeleccionada){
      this.paginaSeleccionada = 1;
    }
    this.paginacion();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.datos = changes['datos'].currentValue;
    this.listado = changes['datos'].currentValue;
    this.respaldo = changes['datos'].currentValue;
    this.indiceOrden = undefined;
    this.ordenASC = false;
    this.configurarPaginacion();
    this.totalDatos = (this.datos !== null && this.datos !== undefined) ? this.datos.length : 0;
  }

  mostrar(items: any, i: any) {
    let actual = !items.seleccionado;
    if (!this.configuracion.multiseleccion) {
      this.datos.forEach((element: any) => {
        if(items.id.toString() === element.id.toString()){
          items.seleccionado = actual;
          items.POSICION = i;
        }else{
          element.seleccionado = false;
        }
      });
      
      this.emitidor.emit((items.seleccionado) ? items : undefined);
    }else{
      items.seleccionado = (items.seleccionado) ? false : true;
      let arreglo = new Array();
      this.datos.forEach((element: any) => {
        if(element.seleccionado){
          items.POSICION = i;
          arreglo.push(element);
        }
      });
      this.emitidor.emit(arreglo);
    }
  }

  dobleClick(item: any) {
    this.doble.emit(item);
  }

  buscar(busqueda: any){
    if(busqueda !== undefined && busqueda.length > 0){
      let final: Array<any> = new Array<any>();
      this.datos.forEach((elemento: any) => {
        let coincide = false;
        this.configuracion.encabezados.forEach((encabezado: any) => {
          if(elemento[encabezado] !== undefined && elemento[encabezado] !== null){
            if(elemento[encabezado].toString().toUpperCase().includes(busqueda.toString().toUpperCase())){
              coincide = true;
            }
          }
        });
        if(coincide){
          final.push(elemento);
        }
      });
      this.datos = final;
      this.configurarPaginacion();
    }else{
      this.datos = this.respaldo;
      this.configurarPaginacion();
    }
  }

  ordenar(indice: any){
    if(this.datos !== undefined && this.datos.length > 0){
      this.indiceOrden = indice;
      if(this.ordenASC){
        this.ordenarDESC(indice);
      }else{
        this.ordenarASC(indice);
      }
      this.ordenASC = !this.ordenASC;
    }
  }

  reordenar(){
    if(this.listado !== undefined && this.listado.length > 0){
      if(this.ordenASC){
        this.ordenarDESC(this.indiceOrden);
      }else{
        this.ordenarASC(this.indiceOrden);
      }
    }
  }

  ordenarASC(indice: any){
    let arreglo = new Array<any>();
    this.datos.forEach((elemento: any) => {
      arreglo.push(elemento[this.configuracion.encabezados[indice]]+'||'+elemento.id);
    });
    arreglo = arreglo.sort();
    let final = new Array();
    arreglo.forEach((elemento: any) => {
      let separados = elemento.split('||');
      this.datos.forEach((dato: any) => {
        if(parseInt(separados[1]) === parseInt(dato.id)){
          final.push(dato);
        }
      });
    });
    this.datos = final;
    this.paginacion();
  }

  ordenarDESC(indice: any){
    let arreglo = new Array<any>();
    this.datos.forEach((elemento: any, index: any) => {
      arreglo.push(elemento[this.configuracion.encabezados[indice]]+'||'+elemento.id);
    });
    arreglo = arreglo.sort().reverse();
    let final = new Array();
    arreglo.forEach((elemento: any) => {
      let separados = elemento.split('||');
      this.datos.forEach((dato: any) => {
        if(parseInt(separados[1]) === parseInt(dato.id)){
          final.push(dato);
        }
      });
    });
    this.datos = final;
    this.paginacion();
  }

  paginacion(){
    if(this.datos !== undefined){
      let final = new Array();
      let inicio = (this.paginaSeleccionada === 1) ? 0 : ((this.numeroFilas * (this.paginaSeleccionada-1)));
      for (let index = 0; index < this.numeroFilas; index++) {
        if(this.datos[inicio] !== undefined){
          final.push(this.datos[inicio]);
          inicio = inicio + 1;
        }
      }
      this.listado = final;
    }
  }

  exportToExcel() {
    if (!this.datos || this.datos.length === 0) return;
  
    // Crear una copia de los datos para no modificar el original
    const datosParaExportar = this.datos.map((item: any) => {
      let obj: any = {};
      this.configuracion.encabezados.forEach((encabezado: string) => {
        obj[encabezado] = item[encabezado] !== undefined ? item[encabezado] : '';
      });
      return obj;
    });
  
    // Crear hoja de Excel
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosParaExportar);
    const workbook: XLSX.WorkBook = { Sheets: { 'Datos': worksheet }, SheetNames: ['Datos'] };
  
    // Generar archivo
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'tabla.xlsx');
  }

}
