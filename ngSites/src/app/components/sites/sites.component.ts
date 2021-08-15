import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Site } from 'src/app/models/site';
import { SiteService } from 'src/app/services/site.service';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sites',
  templateUrl: './sites.component.html',
  styleUrls: ['./sites.component.css']
})
export class SitesComponent implements OnInit {
  sites: Site[] = [];

  constructor(private siteService: SiteService,
    private currentRouter: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal) { }

  newSite: Site = new Site();
  selected: Site | null = null;
  editSite: Site | null = null;
  closeResult = '';

  ngOnInit(): void {
    this.loadSites();
  }
// Got these from the modal tutorial //
  open(content: any) {
    this.modalService.open(content,
   {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = 
         `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  loadSites() {
this.siteService.index().subscribe(
  sites => {
    this.sites = sites;
  },
  noSites => {
    console.log('SitesListComponent.loadSites(): Error Retrieving Sites List.');
    console.error(noSites);
    
  })}
// Additions from todo //
reload(){
  this.siteService.index().subscribe(
    data => this.sites = data,
    err => console.error('Observer got an error in reload: ' + err)
  )
}

displaySite(site: Site): Site {
  this.selected = site;
  return this.selected;
}

displayTable(){
  this.selected = null;
}

addSite(){
console.log(this.newSite);
  this.siteService.create(this.newSite).subscribe(
    data => {
      this.reload();
      this.newSite = new Site();

    },
    err => console.error('Observer got an error in addSite: ' + err)
    );

}

setEditSite() {
  this.editSite = Object.assign({}, this.selected);
}

cancelEditSite(){
  this.editSite = null;
}

updateSite(site: Site){
this.siteService.update(site).subscribe(data => {
console.log(site.updated);
this.reload();
});
this.cancelEditSite();
this.displayTable();
}

deleteSite(id: number){
  console.log(id);
   this.siteService.destroy(id).subscribe(data => {
     console.log(data);
     this.reload();
   });
}

checkDifficulty(): string{
  if (this.newSite.difficulty === 'easy'){
    return 'badge easy';
  }
  else if (this.newSite.difficulty === 'medium'){
    return 'badge medium';
  }
  else if (this.newSite.difficulty === 'hard'){
    return 'badge hard';
  }
  else if (this.newSite.difficulty === 'impossible') {
    return 'badge impossible';
  }

  else {
   return '';
  }
}


}
