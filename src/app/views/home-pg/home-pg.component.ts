import { Component, OnInit } from '@angular/core';
import { AmenitiesService } from '../../core/services/amenities.service';
import { FilterHotel } from '../../core/models/filter-hotels.model';
import { FilterModalComponent } from './filter-modal/filter-modal.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-home-pg',
  templateUrl: './home-pg.component.html',
  styleUrl: './home-pg.component.css'
})
export class HomePgComponent implements OnInit {
  getCardImages(card: any): any[] {
    if (!card.images) {
      card.images = [];
      for (let i = 0; i < 5; i++) {
        card.images.push({ url: `assets/image${i + 1}.jpg` });
      }
      this.activeImageIndex[this.cards.indexOf(card)] = 0;
    }
    return card.images;
  }

  allHotels: any[] = [];
  filteredHotels: any[] = [];
  activeSlideIndex = 0;
  activeImageIndex: number[] = [];
  filterModalRef!: MatDialogRef<FilterModalComponent>;

  constructor(
    private amenitiesService: AmenitiesService,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer,
    private router: Router
  ) { }

  cards = [
    {
      image: 'assets/image1.jpg',
      title: 'Islands',
    },
    {
      image: 'assets/image2.jpg',
      title: 'Lakefront',

    },
    {
      image: 'assets/image3.jpg',
      title: 'Countryside',

    },
    {
      image: 'assets/image4.jpg',
      title: 'Cabins',

    },
    {
      image: 'assets/image5.jpg',
      title: 'Amazing views',

    },
    {
      image: 'assets/image6.jpg',
      title: 'Dessert',
    },
    {
      image: 'assets/image7.jpg',
      title: 'Arctic',
    },
    {
      image: 'assets/image8.jpg',
      title: 'ski-in/out',
    },

  ];

  openHotelDetails(hotelId: number) {
    const url = this.router.serializeUrl(
      this.router.createUrlTree(['/hotel-details', hotelId])
    );
    window.open(url, '_blank');
  }

  getSanitizedSVG(svgCode: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(svgCode);
  }

  ngOnInit(): void {
    this.amenitiesService.getAllHotels().subscribe(
      response => {
        this.allHotels = response;
        this.filteredHotels = response;
        this.filteredHotels.forEach((hotel) => {
          this.activeImageIndex.push(0);
          this.amenitiesService.getHotelById(hotel.id).subscribe(
            hotelDetails => {
              if (hotelDetails) {
                hotel.images = hotelDetails.images;
              }
            }
          );
        });
      },
      error => {
        console.error('Error retrieving hotels:', error);
      }
    );
  }

  previousImage(hotelIndex: number, event: Event) {
    event.stopPropagation();
    this.activeImageIndex[hotelIndex] = (this.activeImageIndex[hotelIndex] - 1 + this.filteredHotels[hotelIndex].images.length) % this.filteredHotels[hotelIndex].images.length;
  }

  nextImage(hotelIndex: number, event: Event) {
    event.stopPropagation();
    this.activeImageIndex[hotelIndex] = (this.activeImageIndex[hotelIndex] + 1) % this.filteredHotels[hotelIndex].images.length;
  }




  openFilterModal() {
    this.filterModalRef = this.dialog.open(FilterModalComponent);
    this.filterModalRef.componentInstance.filterFormSubmitEvent.subscribe((filterData: any) => {
      this.applyFilters(filterData);
    });
    this.filterModalRef.componentInstance.closeModalEvent.subscribe(() => {
      this.filterModalRef.close();
    });
  }

  applyFilters(filterData: any) {
    this.amenitiesService.getFilteredHotels(filterData).subscribe(
      response => {
        if (response.length === 0) {
          console.log('No hotels found matching the filter criteria');
          this.filteredHotels = []; 
        } else {
          this.filteredHotels = response;
        }
        this.activeImageIndex = this.filteredHotels.map(() => 0); 
      },
      error => {
        console.error('Error retrieving filtered hotels:', error);
      }
    );
  }
}
