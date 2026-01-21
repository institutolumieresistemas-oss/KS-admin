import { Component } from '@angular/core';
import { GeneralesService } from '../../servicios/generales.service';
import { EventosService } from '../../servicios/eventos.service';
import { datatableConfig } from '../../interfaces/tables.interface';
import { MetasService } from '../../servicios/metas.service';

@Component({
    selector: 'app-metas',
    templateUrl: './metas.component.html',
    styleUrl: './metas.component.css',
    standalone: false
})
export class MetasComponent {
    eventos: any;
    ingresos: any;
    constructor(private generales: GeneralesService, private servicio: MetasService){}
    
    ngOnInit(): void {
        this.traer();
    }

    traer(){
        this.servicio.traer().subscribe((respuesta: any) => {
            this.eventos = respuesta.eventos;
            this.ingresos = respuesta.ingresos;
        },
        error => {
            this.generales.interpretarError(error);
        });
    }
}
