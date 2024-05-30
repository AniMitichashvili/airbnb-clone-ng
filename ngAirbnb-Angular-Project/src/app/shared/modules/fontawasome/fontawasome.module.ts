import { NgModule, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ], exports:[]
})
export class FontawasomeModule implements OnInit {
  icon=faCircleQuestion

  ngOnInit(): void {
  }


}
