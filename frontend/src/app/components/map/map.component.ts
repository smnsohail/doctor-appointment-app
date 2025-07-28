import { Component } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps'
@Component({
  selector: 'app-map',
  imports: [GoogleMapsModule],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  //  center: google.maps.LatLngLiteral = { lat: 19.076, lng: 72.8777 }; // Mumbai example
  // markers = [
  //   { position: { lat: 19.082, lng: 72.881 }, title: 'Dr. Smith - Cardiology' },
  //   { position: { lat: 19.072, lng: 72.873 }, title: 'Dr. Lee - Neurology' },
  // ];
}
