import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { environment } from './environment';

@Injectable({
  providedIn: 'root'
})
export class AmenitiesService {
  // private unsplashApiUrl = 'https://api.unsplash.com';
  // private unsplashAccessKey = environment.unsplashAccessKey;
  private apiUrl = 'http://www.airbnb-digital-students.somee.com/api/Apartments/filter';
  private unsplashApiUrl = 'https://api.unsplash.com';
  private unsplashAccessKey = 'FSitJCvPc_sMVe92sJnPLnIv4OSG4Yz8D3y0veqOY74';


  constructor(private httpClient: HttpClient) { }

  getAllHotels(): Observable<any> {
    return this.httpClient.get('http://www.airbnb-digital-students.somee.com/get-all-hotels');
  }


  getFilteredHotels(filterData: any): Observable<any[]> {
    let params = new HttpParams();

    if (filterData.city) {
      params = params.set('city', filterData.city);
    }
    if (filterData.maxPricePerNight) {
      params = params.set('maxPricePerNight', filterData.maxPricePerNight.toString());
    }
    if (filterData.minRating) {
      params = params.set('minRating', filterData.minRating.toString());
    }
    if (filterData.roomType) {
      params = params.set('roomType', filterData.roomType);
    }
    if (filterData.amenities && filterData.amenities.length > 0) {
      params = params.set('amenities', filterData.amenities.join(','));
    }

    return this.httpClient.get<any[]>(`${this.apiUrl}/api/Apartments/filter/getall`, { params }).pipe(
      catchError(error => {
        if (error.status === 404) {
          console.error('API endpoint not found:', error);  
          return of([]); 
        }
        throw error; 
      })
    );
  }

  getAllAmenities(): Observable<any> {
    return this.httpClient.get(`${this.apiUrl}/getall`);
  }

  getHotelById(id: number): Observable<any> {
    return this.httpClient.get(`http://www.airbnb-digital-students.somee.com/get-by-id?id=${id}`).pipe(
      switchMap((hotel: any) => {
        console.log('API Response:', hotel);
        const hotelImages = hotel.images || [];
        const missingPhotosCount = 5 - hotelImages.length;
        if (missingPhotosCount > 0) {
          const query = hotel.name;
          const unsplashRequests = [];
          for (let i = 0; i < missingPhotosCount; i++) {
            const unsplashUrl = `${this.unsplashApiUrl}/search/photos?query=${encodeURIComponent(query)}&page=${i + 1}&per_page=1&client_id=${this.unsplashAccessKey}&w=400&h=300&fit=crop`;
            unsplashRequests.push(this.httpClient.get(unsplashUrl));
          }
          return forkJoin(unsplashRequests).pipe(
            map((unsplashResponses: any[]) => {
              const additionalPhotos = unsplashResponses.map((response: any) => {
                const photo = response.results[0];
                return {
                  url: photo.urls.regular,
                  description: photo.description || '',
                };
              });
              hotel.images = [...hotelImages, ...additionalPhotos];
              return hotel;
            }),
            catchError(() => {
              return of(hotel);
            })
          );
        } else {
          return of(hotel);
        }
      }),
      catchError((error) => {
        console.error('Error retrieving hotel details:', error);
        return of(null);
      })
    );
  }

  addReservation(reservationData: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer YOUR_AUTH_TOKEN'
    });

    return this.httpClient.post('http://www.airbnb-digital-students.somee.com/add-reservation', reservationData, { headers });
  }

  getReservations(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': 'Bearer YOUR_AUTH_TOKEN'
    });

    return this.httpClient.get('http://www.airbnb-digital-students.somee.com/get-reservations', { headers });
  }

  getCommentsByHotelId(hotelId: number): Observable<any[]> {
    return this.httpClient.get<any[]>(`http://www.airbnb-digital-students.somee.com/get-apartment-comments?hotelId=${hotelId}`).pipe(
      catchError(error => {
        console.error('Error retrieving comments:', error);
        return of([]);
      })
    );
  }

  addComment(commentData: any): Observable<any> {
    return this.httpClient.post('http://www.airbnb-digital-students.somee.com/add', commentData).pipe(
      catchError(error => {
        console.error('Error adding comment:', error);
        throw error;
      })
    );
  }





}