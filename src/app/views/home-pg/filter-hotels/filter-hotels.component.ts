import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filter-hotels',
  templateUrl: './filter-hotels.component.html',
  styleUrls: ['./filter-hotels.component.css']
})
export class FilterHotelsComponent implements OnInit {
  @Output() filterFormSubmitEvent: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  onFilterHotelFormSubmit() {
    this.filterFormSubmitEvent.emit();
  }
}