import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SiteService } from './services/site.service';
import { SitesListComponent } from './components/sites-list/sites-list.component';

@NgModule({
  declarations: [
    AppComponent,
    SitesListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [SiteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
