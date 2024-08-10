import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailablePlacesComponent } from "./places/available-places/available-places.component";
import { UserPlacesComponent } from "./places/user-places/user-places.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AvailablePlacesComponent, UserPlacesComponent]
})
export class AppComponent {
  title = 'PlacePicker';
}
