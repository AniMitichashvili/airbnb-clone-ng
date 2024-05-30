import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AmenitiesService } from '../../../core/services/amenities.service';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css']
})
export class HotelDetailsComponent implements OnInit {
  staticMapUrl: string = 'YOUR_STATIC_MAP_IMAGE_URL';

  hotel: any;
  checkinDate: Date | undefined;
  checkoutDate: Date | undefined;
  numberOfGuests: number = 1;
  mapUrl: SafeResourceUrl = '';
  comments: any[] = [];
  newComment: string = '';


  constructor(
    private route: ActivatedRoute,
    private amenitiesService: AmenitiesService,
    private http: HttpClient,
    private sanitizer: DomSanitizer
  ) { }

  mapOptions = {
    center: [0, 0],
    zoom: 12
  };

  ngOnInit(): void {
    const hotelId = +this.route.snapshot.params['id'];
    this.amenitiesService.getHotelById(hotelId).subscribe(
      response => {
        console.log('API Response:', response);
        this.hotel = response;
        this.getMapUrl();
        this.extractAmenities();
      },
      error => {
        console.error('Error retrieving hotel details:', error);
      }
    );
    this.fetchComments();
  }

  extractAmenities(): void {
    if (this.hotel && this.hotel.rooms) {
      const allAmenities = new Set<string>();
      this.hotel.rooms.forEach((room: any) => {
        if (room.amenities) {
          room.amenities.forEach((amenity: string) => {
            allAmenities.add(amenity);
          });
        }
      });
      this.hotel.amenities = Array.from(allAmenities);
    }
  }

  calculateTotalPrice(): number {
    if (this.checkinDate && this.checkoutDate && this.hotel && this.hotel.rooms && this.hotel.rooms.length > 0) {
      const timeDiff = Math.abs(this.checkoutDate.getTime() - this.checkinDate.getTime());
      const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return this.hotel.rooms[0].pricePerNight * numberOfNights;
    }
    return 0;
  }

  calculateNumberOfNights(): number {
    if (this.checkinDate && this.checkoutDate) {
      const timeDiff = Math.abs(this.checkoutDate.getTime() - this.checkinDate.getTime());
      const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      return numberOfNights;
    }
    return 0;
  }

  bookHotel(): void {
    if (this.checkinDate && this.checkoutDate && this.hotel) {
      const reservationData = {
        hotelId: this.hotel.id.toString()
      };

      this.amenitiesService.addReservation(reservationData).subscribe(
        response => {
          console.log('Reservation added successfully:', response);
        },
        error => {
          console.error('Error adding reservation:', error);
          if (error.status === 401) {
            console.error('Unauthorized access. Please login to proceed.');
          } else {
            console.error('An error occurred while adding the reservation.');
          }
        }
      );
    }
  }

  getMapUrl() {
    if (this.hotel && this.hotel.address && this.hotel.address.street && this.hotel.address.city && this.hotel.address.state) {
      const address = encodeURIComponent(`${this.hotel.address.street}, ${this.hotel.address.city}, ${this.hotel.address.state}`);
      const mapUrl = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${address}`;
      return mapUrl;
    }
    return 'https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=0,0&zoom=1';
  }

  fetchComments() {
    const hotelId = +this.route.snapshot.params['id'];
    this.amenitiesService.getCommentsByHotelId(hotelId).subscribe(
      response => {
        this.comments = response;
      },
      error => {
        console.error('Error retrieving comments:', error);
      }
    );
  }

  addComment() {
    const hotelId = +this.route.snapshot.params['id'];
    const commentData = {
      message: this.newComment,
      hotelId: hotelId.toString()
    };

    this.amenitiesService.addComment(commentData).subscribe(
      response => {
        console.log('Comment added successfully:', response);
        this.newComment = '';
        this.fetchComments();
      },
      error => {
        console.error('Error adding comment:', error);
      }
    );
  }
  getStars(rating: number): string[] {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const stars = Array(fullStars).fill('full');
    if (hasHalfStar) {
      stars.push('half');
    }
    return stars;
  }
}