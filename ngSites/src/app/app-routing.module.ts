import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SitesComponent } from './components/sites/sites.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'sites' },
  { path: 'sites', component: SitesComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
