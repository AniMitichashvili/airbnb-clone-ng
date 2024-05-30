import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../shared/modules/material/material.module';
import { AuthModule } from './auth/auth.module';
import { HomePgComponent } from './home-pg/home-pg.component';
import { FilterHotelsComponent } from './home-pg/filter-hotels/filter-hotels.component';
import { HotelDetailsComponent } from './home-pg/hotel-details/hotel-details.component';
import { FilterModalComponent } from './home-pg/filter-modal/filter-modal.component';
import { ErrorPageComponent } from './error-page/error-page.component';




@NgModule({
  declarations: [
    HomePgComponent,
    FilterHotelsComponent,
    HotelDetailsComponent,
    FilterModalComponent,
    ErrorPageComponent,


  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
    MaterialModule,


  ],
  exports: [
    HomePgComponent,
    FilterHotelsComponent,
    HotelDetailsComponent,
    FilterModalComponent,
  
  ],


})
export class ViewsModule {

}
