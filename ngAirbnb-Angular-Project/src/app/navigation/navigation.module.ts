import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbar, MatToolbarModule} from '@angular/material/toolbar';
import { FontawasomeModule } from '../shared/modules/fontawasome/fontawasome.module';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatToolbar,
    MatButtonModule, 
    FontawasomeModule,
  ],
  exports:[
    HeaderComponent,
    FooterComponent
  ]
})
export class NavigationModule {  }
