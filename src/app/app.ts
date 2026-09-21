import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, of } from 'rxjs';
import { DataService } from '../data/data'
import { MapComponent } from '../components/map/map';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, MapComponent, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-Iptracker');
  location$!: Observable<any>; // The '$' suffix denotes an Observable
  searchIp = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.location$ = this.dataService.getLocations()
  }

  updateLocation(location: any): void {
    this.location$ = of(location);
  }

}
