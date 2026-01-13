import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuditoriasIngresosComponent } from './auditorias-ingresos/auditorias-ingresos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { AuditoriasEgresosComponent } from './auditorias-egresos/auditorias-egresos.component';



@NgModule({
  declarations: [
    AuditoriasIngresosComponent,
    AuditoriasEgresosComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class AuditoriasModule { }
