import { Component, afterNextRender } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapComponent {
  
  constructor() {
    afterNextRender(async () => {
      const leafletMap = await import('leaflet');

      const map = leafletMap.map('map').setView([51.505, -0.09], 13);

      leafletMap.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)

      const circle = leafletMap.circle([51.505, -0.09], {
        color: 'blue',
        fillColor: 'cyan',
        fillOpacity: 0.2,
        radius: 500,
        weight: 4,
      }).addTo(map).bindPopup('Your IP Address');

    })
  }

}
