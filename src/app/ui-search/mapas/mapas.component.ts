import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mapas',
  templateUrl: './mapas.component.html',
  standalone: false
})
export class MapasComponent implements AfterViewInit {
  @ViewChild('inputDireccion') inputDireccion!: ElementRef;

  @Input() direccionInicial: string = '';
  @Output() alCambiarDireccion = new EventEmitter<any>();

  // Coordenadas de tu empresa en Guadalajara
  empresaCoords = { lat: 20.6953631, lng: -103.3365005 }; 
  
  distancia: string = '';
  googleMapsUrl: string = '';

  async ngAfterViewInit() {
    try {
      await google.maps.importLibrary("places");
      
      const autocomplete = new google.maps.places.Autocomplete(this.inputDireccion.nativeElement, {
        fields: ['geometry', 'formatted_address'],
        types: ['address']
      });

      // Si el padre manda una dirección, solo la escribimos en el input sin procesar nada
      if (this.direccionInicial) {
        this.inputDireccion.nativeElement.value = this.direccionInicial;
      }

      // ACCIÓN 1: Al seleccionar una sugerencia de la lista
      autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace();
        if (place.geometry && place.geometry.location) {
          this.procesarSeleccion(place.geometry.location, place.formatted_address || '');
        }
      });

      // ACCIÓN 2: Al presionar ENTER manualmente
      google.maps.event.addDomListener(this.inputDireccion.nativeElement, 'keydown', (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
          e.preventDefault(); 
          const textoBusqueda = this.inputDireccion.nativeElement.value;
          if (textoBusqueda) {
            this.buscarPorTexto(textoBusqueda);
          }
        }
      });

    } catch (e) {
      console.error("Error al cargar Google Maps:", e);
    }
  }

  // Método auxiliar para la búsqueda por ENTER
  private buscarPorTexto(direccion: string) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: direccion }, (results, status) => {
      if (status === 'OK' && results && results[0].geometry) {
        this.procesarSeleccion(results[0].geometry.location, results[0].formatted_address);
      }
    });
  }

  // Proceso común de cálculo y emisión
  private procesarSeleccion(destino: google.maps.LatLng, direccionTexto: string) {
    const service = new google.maps.DistanceMatrixService();
    
    service.getDistanceMatrix({
      origins: [this.empresaCoords],
      destinations: [destino],
      travelMode: google.maps.TravelMode.DRIVING,
      unitSystem: google.maps.UnitSystem.METRIC,
    }, (response, status) => {
      if (status === 'OK' && response?.rows[0].elements[0].status === 'OK') {
        
        this.distancia = response.rows[0].elements[0].distance.text;
        
        const originStr = `${this.empresaCoords.lat},${this.empresaCoords.lng}`;
        const destStr = `${destino.lat()},${destino.lng()}`;
        this.googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${originStr}&destination=${destStr}&travelmode=driving`;

        // Actualizamos el input con la dirección oficial de Google
        this.inputDireccion.nativeElement.value = direccionTexto;

        // Emitimos al padre
        this.alCambiarDireccion.emit({
          direccion: direccionTexto,
          distancia: this.distancia,
          url: this.googleMapsUrl
        });
      }
    });
  }
}