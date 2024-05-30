import { Component, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { NavigationModule } from './navigation/navigation.module';
import { ViewsModule } from './views/views.module';
import { MaterialModule } from './shared/modules/material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthModule } from './views/auth/auth.module';



@NgModule({
    declarations: [
        AppComponent,
    ],
    providers: [
        provideAnimationsAsync(),
        provideNativeDateAdapter()

    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        NavigationModule,
        ViewsModule,
        MaterialModule,
        HammerModule,
        HttpClientModule,
        AuthModule,
        

    ]
})
export class AppModule { }
