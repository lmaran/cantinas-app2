import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ClarityModule } from '@clr/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { AuthenticationService } from './authentication.service';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserFormComponent } from './user/user-form/user-form.component';

import { UserService } from '../app/shared/services/user.service';
import { DisplayErrorComponent } from './core/display-error/display-error.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        UserListComponent,
        UserDetailComponent,
        UserFormComponent,
        DisplayErrorComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ClarityModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [AuthenticationService, UserService],
    bootstrap: [AppComponent],
})
export class AppModule {}
