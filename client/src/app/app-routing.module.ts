import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Link1Component } from './link1/link1.component';

const routes: Routes = [{ path: 'link1', component: Link1Component }];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
