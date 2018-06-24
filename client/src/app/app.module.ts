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
import { DishListComponent } from './dish/dish-list/dish-list.component';
import { DishDetailComponent } from './dish/dish-detail/dish-detail.component';
import { EntityListComponent } from './entity/entity-list/entity-list.component';
import { EntityDetailComponent } from './entity/entity-detail/entity-detail.component';

import { UserService } from '../app/shared/services/user.service';
import { DishService } from '../app/shared/services/dish.service';
import { EntityService } from '../app/shared/services/entity.service';
import { DisplayErrorComponent } from './core/display-error/display-error.component';

import { AppModalComponent } from '../app/shared/components/confirmDelete/confirmDelete.component';

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        HomeComponent,
        UserListComponent,
        UserDetailComponent,
        DishListComponent,
        DishDetailComponent,
        DisplayErrorComponent,
        AppModalComponent,
        EntityListComponent,
        EntityDetailComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        BrowserModule,
        ClarityModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
    ],
    providers: [AuthenticationService, UserService, DishService, EntityService],
    bootstrap: [AppComponent],
})
export class AppModule {}
