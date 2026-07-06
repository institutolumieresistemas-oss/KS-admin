import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { PermisosComponent } from './permisos/permisos.component';
import { BalanceGeneralComponent } from './balance-general/balance-general.component';
import { IngresosDirectivoComponent } from './ingresos-directivo/ingresos-directivo.component';
import { AdministrativosModule } from '../administrativos/administrativos.module';
import { EgresosDirectivoComponent } from './egresos-directivo/egresos-directivo.component';
import { IngresosAuditoriasComponent } from './ingresos-auditorias/ingresos-auditorias.component';
import { EgresosAuditoriasComponent } from './egresos-auditorias/egresos-auditorias.component';



@NgModule({
  declarations: [
    PermisosComponent,
    BalanceGeneralComponent,
    IngresosDirectivoComponent,
    EgresosDirectivoComponent,
    IngresosAuditoriasComponent,
    EgresosAuditoriasComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule,
    AdministrativosModule
  ]
})
export class DirectivosModule { }
