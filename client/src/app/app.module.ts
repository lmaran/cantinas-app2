import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationService } from './authentication.service';

@NgModule({
    declarations: [AppComponent, AboutComponent, HomeComponent],
    imports: [BrowserAnimationsModule, BrowserModule, ClarityModule, AppRoutingModule, HttpClientModule],
    providers: [AuthenticationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
