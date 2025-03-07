import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IngresosComponent } from './ingresos/ingresos.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalIngresoComponent } from './ingresos/modales/modal-ingreso/modal-ingreso.component';
import { EgresosComponent } from './egresos/egresos.component';
import { ModalEgresoComponent } from './egresos/modales/modal-egreso/modal-egreso.component';
import { EventosComponent } from './eventos/eventos.component';
import { ModalEventoComponent } from './eventos/modales/modal-evento/modal-evento.component';
import { DatosClienteComponent } from './eventos/componentes/datos-cliente/datos-cliente.component';
import { DatosEmpresaComponent } from './eventos/componentes/datos-empresa/datos-empresa.component';
import { DatosPersonajesComponent } from './eventos/componentes/datos-personajes/datos-personajes.component';
import { ModalLiderComponent } from './eventos/modales/modal-lider/modal-lider.component';
import { ModalEquipoComponent } from './eventos/modales/modal-equipo/modal-equipo.component';
import { PrincipalComponent } from './principal/principal.component';
import { EstadoCuentaEventoComponent } from './estado-cuenta-evento/estado-cuenta-evento.component';
import { ModalAbonoComponent } from './estado-cuenta-evento/modales/modal-abono/modal-abono.component';
import { CorteCajaComponent } from './corte-caja/corte-caja.component';
import { ModalGastoComponent } from './estado-cuenta-evento/modales/modal-gasto/modal-gasto.component';



@NgModule({
  declarations: [
    IngresosComponent,
    ModalIngresoComponent,
    EgresosComponent,
    ModalEgresoComponent,
    EventosComponent,
    ModalEventoComponent,
    DatosClienteComponent,
    DatosEmpresaComponent,
    DatosPersonajesComponent,
    ModalLiderComponent,
    ModalEquipoComponent,
    PrincipalComponent,
    EstadoCuentaEventoComponent,
    ModalAbonoComponent,
    CorteCajaComponent,
    ModalGastoComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class AdministrativosModule { }
