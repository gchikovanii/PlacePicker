import { inject, Injectable, signal } from '@angular/core';
import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  errorService = inject(ErrorService);
  private userPlaces = signal<Place[]>([]);
  httpClient = inject(HttpClient);
  loadedUserPlaces = this.userPlaces.asReadonly();
  baseUrl = 'http://localhost:3000/';
  loadAvailablePlaces() {
    return this.fetchPlaces(`${this.baseUrl}places`,'Something went wrong while fetching data');
  }

  loadUserPlaces() {
    return this.fetchPlaces(`${this.baseUrl}user-places`,'Something went wrong while fetching user data').pipe(tap({
      next: (userPlaces) => {this.userPlaces.set(userPlaces)}
    }))
  }

  //Optimistic update problem, fixing below
  // addPlaceToUserPlaces(place: Place) {
  //   var prev = this.userPlaces;
  //   this.userPlaces.update(preValue => [...preValue,place]);
  //   return this.httpClient.put(`${this.baseUrl}user-places`,{
  //     placeId : place.id
  //   });
  // }

  addPlaceToUserPlaces(place: Place) {
    var preValue = this.userPlaces();
    if(!preValue.some((inputs) => inputs.id === place.id)){
      this.userPlaces.set([...preValue,place]);
    }
      
    return this.httpClient.put(`${this.baseUrl}user-places`,{
      placeId : place.id
    }).pipe(catchError(error  => {
      //manually roll-back if error occured
      this.userPlaces.set(preValue);
      this.errorService.showError('Failed to store selected place');
      return throwError(() => new Error('Failed to store selected place'))
    }))
  }

  removeUserPlace(place: Place) {
    var preValue = this.userPlaces();
    if(preValue.some((inputs) => inputs.id === place.id)){
      //return all execpt deleted one
      this.userPlaces.set(preValue.filter(i => i.id !== place.id));
    }
    return this.httpClient.delete(`${this.baseUrl}user-places/${place.id}`).pipe(catchError(error  => {
      this.userPlaces.set(preValue);
      this.errorService.showError('Failed to delete the selected place');
      return throwError(() => new Error('Failed to delete the selected places'))
    }))
  }

  private fetchPlaces(url : string,errorMessage: string){
    return this.httpClient.get<{places: Place[]}>(url)
    .pipe(
      map((resultData) => resultData.places),
      catchError((error) => {
        console.log(error);
      return throwError( () => new Error(errorMessage));
      })
    )
  }
}
