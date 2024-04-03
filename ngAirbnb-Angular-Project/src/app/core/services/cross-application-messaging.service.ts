import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrossApplicationMessagingService {

  static messageEvent:EventEmitter<any> = new EventEmitter<any>();
  constructor() { }
}
