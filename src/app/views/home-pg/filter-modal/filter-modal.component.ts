import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { AmenitiesService } from '../../../core/services/amenities.service';

@Component({
  selector: 'app-filter-modal',
  templateUrl: './filter-modal.component.html',
  styleUrls: ['./filter-modal.component.css']
})
export class FilterModalComponent implements OnInit {
  filterForm: FormGroup;
  @Output() filterFormSubmitEvent: EventEmitter<any> = new EventEmitter();
  @Output() closeModalEvent: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private amenitiesService: AmenitiesService
  ) {
    this.filterForm = this.fb.group({
      roomType: '',
      city: '',
      maxPricePerNight: '',
      minRating: '',
      amenities: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.amenitiesService.getAllAmenities().subscribe(response => {
      response.forEach((amenity: any) => {
        this.amenitiesFormArray.push(new FormControl(amenity.name));
      });
    });
  }

  get amenitiesFormArray() {
    return this.filterForm.get('amenities') as FormArray;
  }

  addAmenity() {
    this.amenitiesFormArray.push(new FormControl(''));
  }

  onFilterHotelFormSubmit() {
    const formValues = this.filterForm.value;
    this.filterFormSubmitEvent.emit(formValues);
  }

  onCloseModal() {
    this.closeModalEvent.emit();
  }
}