import { Component, EventEmitter, OnInit, AfterViewInit, Input, Output } from '@angular/core';
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
  private mapInit?: Promise<void>;
  private locationMarker?: leafletMap.Circle;

  ipData: any = {};
  // Receiving searchIp from app.ts
  @Input() searchIp = '';
  // Pass the event from here to app.ts
  @Output() locationChange = new EventEmitter<any>();

  constructor(private dataService: DataService) {}

  ngOnInit(): void {}

  async ngAfterViewInit(): Promise<void> {
    if (typeof window === 'undefined') {
      return;
    }

    await this.initMap();
    this.userLocation();
  }

  private initMap(): Promise<void> {
    if (typeof window === 'undefined') {
      return Promise.resolve();
    }

    if (this.map) {
      return Promise.resolve();
    }

    if (this.mapInit) {
      return this.mapInit;
    }

    this.mapInit = import('leaflet').then((leaflet) => {
      this.leaflet = leaflet;

      // Initialize map with a placeholder center view (0, 0)
      this.map = this.leaflet.map('map').setView([0, 0], 7);

      this.leaflet
        .tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; OpenStreetMap contributors',
        })
        .addTo(this.map);
    }).catch((error) => {
      this.mapInit = undefined;
      throw error;
    });

    return this.mapInit;
  }

  async userLocation(Ip: string = ''): Promise<void> {
    await this.initMap();

    this.dataService.getLocations(Ip).subscribe({
      next: (data) => {
        this.ipData = data;
        this.locationChange.emit(data);
        const latitude = data.location.lat;
        const longtitude = data.location.lng;

        // Center map view on the map
        this.map.setView([latitude, longtitude], 13);

        this.locationMarker?.remove();
        this.locationMarker = this.leaflet.circle([latitude, longtitude], {
          color: 'red',
          fillColor: '#f03',
          fillOpacity: 0.5,
          radius: 500
        }).addTo(this.map);

        this.locationMarker.bindPopup('Your IP location').openPopup();
      },

      error: (error) => console.error('Error fetching IP location:', error),
    });
  }

  onSearch(): void {
    if(this.searchIp.trim()) {
      this.userLocation(this.searchIp);
    }
  }

}
