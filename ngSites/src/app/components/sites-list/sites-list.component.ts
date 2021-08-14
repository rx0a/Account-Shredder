import { Component, OnInit } from '@angular/core';
import { Site } from 'src/app/models/site';
import { SiteService } from 'src/app/services/site.service';

@Component({
  selector: 'app-sites-list',
  templateUrl: './sites-list.component.html',
  styleUrls: ['./sites-list.component.css']
})
export class SitesListComponent implements OnInit {

  sites: Site[] = [];

  constructor(private siteService: SiteService) { }

  ngOnInit(): void {
    this.loadSites();
  }

  loadSites() {
this.siteService.index().subscribe(
  sites => {
    this.sites = sites;
  },
  noSites => {
    console.log('SitesListComponent.loadSites(): Error Retrieving Sites List.');
    console.error(noSites);
    
  }
)
  }

}
