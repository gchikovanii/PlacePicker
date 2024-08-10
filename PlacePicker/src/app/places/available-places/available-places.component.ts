import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Place } from '../place.model';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { PlacesComponent } from "../places.component";
import { PlaceService } from '../place.service';

@Component({
    selector: 'app-available-places',
    standalone: true,
    templateUrl: './available-places.component.html',
    styleUrl: './available-places.component.css',
    imports: [PlacesContainerComponent, PlacesComponent]
})
export class AvailablePlacesComponent implements OnInit {
  private placesService = inject(PlaceService);
  private destroyRef = inject(DestroyRef);
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  ngOnInit(): void {
    //true loading
    this.isFetching.set(true);
    const subscription = this.placesService.loadAvailablePlaces().subscribe({
      next: (places) => {
        //set in signal of place when subscribing from service
        this.places.set(places);
      },
      error: (error: Error) => {
        this.error.set(error.message);
      },
      complete: () => {
        //false loading after request finished
        this.isFetching.set(false);
      }
    });
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onSelectPlace(selectedPlace: Place){
    const subscription = this.placesService.addPlaceToUserPlaces(selectedPlace).subscribe({
      next: (redata) => console.log(redata),
      error: (error: Error) => {
        this.error.set(error.message);
      }
    })
    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    });
  }

}
