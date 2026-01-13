import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';
import { datatableConfig } from '../../interfaces/tables.interface';

@Component({
    selector: 'app-metas',
    templateUrl: './metas.component.html',
    styleUrl: './metas.component.css',
    standalone: false
})
export class MetasComponent {
  configuracion: datatableConfig = {
      alias: ['Folio','Festejado', 'Contrato', 'Celular', 'Fecha'],
      encabezados: ['folio', 'festejado', 'nombre', 'celular', 'fecha'],
      busqueda: true
    };
    datos: any;
    cargando = false;
    seleccion: any;
    vista: any;
    listas: any
    
    constructor(private generales: GeneralesService, private servicio: EventosService){}
    
    ngOnInit(): void {
    }
}
