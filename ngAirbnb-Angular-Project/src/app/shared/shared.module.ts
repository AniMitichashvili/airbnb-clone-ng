import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { DirectivesModule } from './directives/directives.module';
import { ModulesModule } from './modules/modules.module';
import { PipesModule } from './pipes/pipes.module';


const Shared_Modules = [
  CommonModule,
  ComponentsModule,
  DirectivesModule,
  ModulesModule,
  PipesModule,
]

@NgModule({
  declarations: [],
  imports: [
    ...Shared_Modules
  ],
  exports: [
    ...Shared_Modules
  ]
})
export class SharedModule { }
