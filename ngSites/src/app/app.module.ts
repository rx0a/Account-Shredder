import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteService } from './services/site.service';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { SitesComponent } from './components/sites/sites.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastNotificationsModule } from 'ngx-toast-notifications';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    SitesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    BrowserAnimationsModule,
    ToastNotificationsModule,
  ],
  providers: [SiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
