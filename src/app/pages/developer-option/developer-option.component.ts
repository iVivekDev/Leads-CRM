import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-developer-option',
  templateUrl: './developer-option.component.html',
  styleUrls: ['./developer-option.component.scss']
})
export class DeveloperOptionComponent implements OnInit {
  Lookup: boolean = true;


  menu: any;



  constructor(private router: Router, private Route: ActivatedRoute) { }

  ngOnInit(): void {
    this.Route.queryParams.subscribe(params => {

      this.menu = params['page'];
      if (this.menu === 'Lookups') {
        this.Lookup = true;


      }

    });
  }

  openMenu1() {
    this.Lookup = true;
    this.router.navigate(['/Developer/'], { queryParams: { page: 'Lookups' } });
  }


}
