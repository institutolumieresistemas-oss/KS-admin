import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TiposUsuarioComponent } from './tipos-usuario/tipos-usuario.component';
import { UiSearchModule } from '../ui-search/ui-search.module';
import { ModalTipoUsuarioComponent } from './tipos-usuario/modales/modal-tipo-usuario/modal-tipo-usuario.component';
import { SucursalesComponent } from './sucursales/sucursales.component';
import { ModalSucursalComponent } from './sucursales/modales/modal-sucursal/modal-sucursal.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUsuarioComponent } from './usuarios/modales/modal-usuario/modal-usuario.component';
import { IngresorubrosComponent } from './ingresorubros/ingresorubros.component';
import { ModalIngresoRubroComponent } from './ingresorubros/modales/modal-ingreso-rubro/modal-ingreso-rubro.component';
import { IngresoTiposComponent } from './ingreso-tipos/ingreso-tipos.component';
import { ModalIngresoTipoComponent } from './ingreso-tipos/modales/modal-ingreso-tipo/modal-ingreso-tipo.component';
import { EgresoRubrosComponent } from './egreso-rubros/egreso-rubros.component';
import { ModalEgresoRubroComponent } from './egreso-rubros/modales/modal-egreso-rubro/modal-egreso-rubro.component';
import { EgresoTiposComponent } from './egreso-tipos/egreso-tipos.component';
import { ModalEgresoTipoComponent } from './egreso-tipos/modales/modal-egreso-tipo/modal-egreso-tipo.component';
import { FormasPagosComponent } from './formas-pagos/formas-pagos.component';
import { ModalFormaPagoComponent } from './formas-pagos/modales/modal-forma-pago/modal-forma-pago.component';
import { CalendariosComponent } from './calendarios/calendarios.component';
import { ModalCalendarioComponent } from './calendarios/modales/modal-calendario/modal-calendario.component';
import { PaquetesComponent } from './paquetes/paquetes.component';
import { ModalPaqueteComponent } from './paquetes/modales/modal-paquete/modal-paquete.component';
import { CuentasComponent } from './cuentas/cuentas.component';
import { ModalCuentaComponent } from './cuentas/modales/modal-cuenta/modal-cuenta.component';
import { MediosPublicitariosComponent } from './medios-publicitarios/medios-publicitarios.component';
import { ModalMedioPublicitarioComponent } from './medios-publicitarios/modales/modal-medio-publicitario/modal-medio-publicitario.component';
import { MotivosComponent } from './motivos/motivos.component';
import { ModalMotivoComponent } from './motivos/modales/modal-motivo/modal-motivo.component';
import { PersonajesComponent } from './personajes/personajes.component';
import { ModalPersonajeComponent } from './personajes/modales/modal-personaje/modal-personaje.component';
import { SemanasComponent } from './semanas/semanas.component';
import { ModalSemanaComponent } from './semanas/modales/modal-semana/modal-semana.component';
import { ActoresComponent } from './actores/actores.component';
import { ModalActorComponent } from './actores/modales/modal-actor/modal-actor.component';



@NgModule({
  declarations: [
    TiposUsuarioComponent,
    ModalTipoUsuarioComponent,
    SucursalesComponent,
    ModalSucursalComponent,
    UsuariosComponent,
    ModalUsuarioComponent,
    IngresorubrosComponent,
    ModalIngresoRubroComponent,
    IngresoTiposComponent,
    ModalIngresoTipoComponent,
    EgresoRubrosComponent,
    ModalEgresoRubroComponent,
    EgresoTiposComponent,
    ModalEgresoTipoComponent,
    FormasPagosComponent,
    ModalFormaPagoComponent,
    CalendariosComponent,
    ModalCalendarioComponent,
    PaquetesComponent,
    ModalPaqueteComponent,
    CuentasComponent,
    ModalCuentaComponent,
    MediosPublicitariosComponent,
    ModalMedioPublicitarioComponent,
    MotivosComponent,
    ModalMotivoComponent,
    PersonajesComponent,
    ModalPersonajeComponent,
    SemanasComponent,
    ModalSemanaComponent,
    ActoresComponent,
    ModalActorComponent
  ],
  imports: [
    CommonModule,
    UiSearchModule
  ]
})
export class CatalogosModule { }
