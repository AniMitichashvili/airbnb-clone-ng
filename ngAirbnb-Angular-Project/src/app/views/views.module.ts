import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePgComponent } from './home-pg/home-pg.component';
import { AuthModule } from './auth/auth.module';
import { MatFormField } from '@angular/material/form-field';
import { FilterComponent } from './home-pg/filter/filter.component';
import { AdvanceFilterComponent } from './home-pg/advance-filter/advance-filter.component';
import { MaterialModule } from '../shared/modules/material/material.module';
import { SlickCarouselModule } from 'ngx-slick-carousel';






@NgModule({
  declarations: [
    HomePgComponent,
    FilterComponent,
    AdvanceFilterComponent,

  ],
  imports: [
    CommonModule,
    AuthModule,
    MatFormField,
    MaterialModule,
    SlickCarouselModule

  ],
  exports: [
    HomePgComponent],


})
export class ViewsModule { }
