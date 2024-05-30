import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material/material.module';
import { FontawasomeModule } from './fontawasome/fontawasome.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    FontawasomeModule

  ],
  exports:[MaterialModule,
  FontawasomeModule]
})
export class ModulesModule { }
