import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationService } from './authentication.service';
import { UserComponent } from './user/user.component';

@NgModule({
    declarations: [AppComponent, AboutComponent, HomeComponent, UserComponent],
    imports: [BrowserAnimationsModule, BrowserModule, ClarityModule, AppRoutingModule, FormsModule, HttpClientModule],
    providers: [AuthenticationService],
    bootstrap: [AppComponent],
})
export class AppModule {}
