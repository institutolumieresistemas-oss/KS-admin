import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteEventosComponent } from './reporte-eventos/reporte-eventos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ReporteIngresosComponent } from './reporte-ingresos/reporte-ingresos.component';
import { ReporteEgresosComponent } from './reporte-egresos/reporte-egresos.component';



@NgModule({
  declarations: [
    ReporteEventosComponent,
    ReporteIngresosComponent,
    ReporteEgresosComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class ReportesModule { }
