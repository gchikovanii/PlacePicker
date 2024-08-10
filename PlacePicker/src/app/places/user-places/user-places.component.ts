import { Component } from '@angular/core';
import { PlacesContainerComponent } from "../places-container/places-container.component";

@Component({
    selector: 'app-user-places',
    standalone: true,
    templateUrl: './user-places.component.html',
    styleUrl: './user-places.component.css',
    imports: [PlacesContainerComponent]
})
export class UserPlacesComponent {

}
