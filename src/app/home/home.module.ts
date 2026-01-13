import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { InicioComponent } from './inicio/inicio.component';
import { LoginComponent } from './login/login.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { FormsModule } from '@angular/forms';
import { DesarrolloModule } from '../desarrollo/desarrollo.module';
import { CatalogosModule } from '../catalogos/catalogos.module';
import { DirectivosModule } from '../directivos/directivos.module';
import { AdministrativosModule } from '../administrativos/administrativos.module';
import { VentasModule } from '../ventas/ventas.module';
import { ConfiguracionesModule } from '../configuraciones/configuraciones.module';
import { MetasModule } from '../metas/metas.module';
import { IniciosModule } from '../inicios/inicios.module';
import { ReportesModule } from '../reportes/reportes.module';
import { AuditoriasModule } from '../auditorias/auditorias.module';


@NgModule({
  declarations: [
    InicioComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    UiSearchModule,
    DesarrolloModule,
    CatalogosModule,
    DirectivosModule,
    AdministrativosModule,
    VentasModule,
    ConfiguracionesModule,
    MetasModule,
    IniciosModule,
    ReportesModule,
    AuditoriasModule
  ]
})
export class HomeModule { }
