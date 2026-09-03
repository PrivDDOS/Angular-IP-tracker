import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../data/data'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('angular-Iptracker');
  location$!: Observable<any[]>; // The '$' suffix denotes an Observable

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.location$ = this.dataService.getLocations()
    console.log(this.location$)
  }

}
