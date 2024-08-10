import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AvailablePlacesComponent } from "./places/available-places/available-places.component";
import { UserPlacesComponent } from "./places/user-places/user-places.component";
import { ErrorService } from './shared/error.service';
import { ErrorModalComponent } from "./shared/modal/error-modal/error-modal.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, AvailablePlacesComponent, UserPlacesComponent, ErrorModalComponent]
})
export class AppComponent {
  title = 'PlacePicker';
  errorService = inject(ErrorService);

  error = this.errorService.error;

}
