import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { PermisosComponent } from './permisos/permisos.component';
import { BalanceGeneralComponent } from './balance-general/balance-general.component';



@NgModule({
  declarations: [
    PermisosComponent,
    BalanceGeneralComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class DirectivosModule { }
