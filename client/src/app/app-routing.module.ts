import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { DishListComponent } from './dish/dish-list/dish-list.component';
import { DishDetailComponent } from './dish/dish-detail/dish-detail.component';
import { EntityListComponent } from './entity/entity-list/entity-list.component';
import { EntityDetailComponent } from './entity/entity-detail/entity-detail.component';

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent, data: { state: 'home' } },
    { path: 'about', component: AboutComponent, data: { state: 'about' } },

    { path: 'users', component: UserListComponent },
    { path: 'users/add', component: UserDetailComponent },
    { path: 'users/:id', component: UserDetailComponent },
    // { path: 'users/:id/edit', component: UserFormComponent },

    { path: 'dishes', component: DishListComponent },
    { path: 'dishes/add', component: DishDetailComponent },
    { path: 'dishes/:id', component: DishDetailComponent },

    { path: 'entities', component: EntityListComponent },
    { path: 'entities/add', component: EntityDetailComponent },
    { path: 'entities/:id', component: EntityDetailComponent },

    // { path: '**', component: NotFound }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
