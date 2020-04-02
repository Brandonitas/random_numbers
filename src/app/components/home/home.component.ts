import { Component, OnInit, ViewChild } from '@angular/core';
import {MatSidenav} from '@angular/material/sidenav';
import {Router, ActivatedRoute} from '@angular/router'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('sidenav', {static: false}) sidenav: MatSidenav;


  public openMiddleSquare: boolean= false; 
  
  close() {  
    this.sidenav.close();
  }

  open(name:any){
    if(name == 'middle-square'){
      this.openMiddleSquare = true;
    }
    this.close();
  }

  constructor() { }

  ngOnInit() {
  }

}
