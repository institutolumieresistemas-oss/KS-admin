import { Component } from '@angular/core';
import { LoadingService } from '../../servicios/loadin.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-cargando',
    templateUrl: './cargando.component.html',
    styleUrl: './cargando.component.css',
    standalone: false
})
export class CargandoComponent {
    loading$!: Observable<boolean>;

    constructor(private loadingService: LoadingService) {
        this.loading$ = this.loadingService.loading$;
    }
}
