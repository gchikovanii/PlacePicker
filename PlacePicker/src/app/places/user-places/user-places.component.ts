import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { PlacesContainerComponent } from "../places-container/places-container.component";
import { Place } from '../place.model';
import { PlaceService } from '../place.service';
import { PlacesComponent } from "../places.component";

@Component({
    selector: 'app-user-places',
    standalone: true,
    templateUrl: './user-places.component.html',
    styleUrl: './user-places.component.css',
    imports: [PlacesContainerComponent, PlacesComponent]
})
export class UserPlacesComponent implements OnInit{
    ngOnInit(): void {
        this.isFetching.set(true);
        const subscription = this.placeService.loadUserPlaces().subscribe({
            error: (error) => this.error.set(error.message),
            complete: () => {
                this.isFetching.set(false);
              }
        });
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        })
    }
    isFetching = signal(false);
    error = signal('');
    private destroyRef = inject(DestroyRef);
    private placeService = inject(PlaceService);
    places = this.placeService.loadedUserPlaces;

    onRemove(place: Place){
        const subscription = this.placeService.removeUserPlace(place).subscribe();
        this.destroyRef.onDestroy(() => {
            subscription.unsubscribe();
        })
    }
}
