import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DataService } from '../../data/data';
import type * as leafletMap from 'leaflet';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.html',
  styleUrl: './map.css',
})
export class MapComponent implements OnInit, AfterViewInit {
  private map!: leafletMap.Map;
  private leaflet!: typeof import('leaflet');

  ipData: any = {};
  searchIp: string = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    await this.initMap();
    this.userLocation();
  }

  private async initMap(): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    this.leaflet = await import('leaflet');

    // Initialize map with a placeholder center view (0, 0)
    this.map = this.leaflet.map('map').setView([0, 0], 7);

    this.leaflet
      .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      })
      .addTo(this.map);
  }

  userLocation(Ip: string = ''): void {
    this.dataService.getLocations(Ip).subscribe({
      next: (data) => {
        this.ipData = data;
        const latitude = data.location.lat;
        const longtitude = data.location.lng;

        // Center map view on the map
        this.map.setView([latitude, longtitude], 13);

        const circle = this.leaflet.circle([latitude, longtitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(this.map)

        circle.bindPopup('Your IP location').openPopup();
      },

      error: (error) => console.error('Error fetching IP location:', error),
    });
  }

  onSearch(): void {
    if(this.searchIp.trim()) {
      this.userLocation(this.searchIp)
    }
  }

}
