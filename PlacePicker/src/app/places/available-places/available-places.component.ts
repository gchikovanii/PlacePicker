import { Component, signal } from '@angular/core';
import { Place } from '../place.model';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";

@Component({
    selector: 'app-available-places',
    standalone: true,
    templateUrl: './available-places.component.html',
    styleUrl: './available-places.component.css',
    imports: [PlacesContainerComponent, PlacesComponent]
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);

}
