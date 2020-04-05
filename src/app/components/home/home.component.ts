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


  public openMiddleSquare: boolean= true; 
  public openCongruencial: boolean=false;
  public openCongruencialMixto: boolean=false;
  public openMultiplicativo: boolean=false;
  public openLinealCombinado: boolean=false;


  close() {  
    this.sidenav.close();
  }

  open(name:any){
    if(name == 'middle-square'){
      this.openMiddleSquare = true;

      //Set others to false
      this.openCongruencial = false;
      this.openCongruencialMixto = false;
      this.openMultiplicativo = false;
      this.openLinealCombinado = false;
      
    }
    if(name == 'congruencial'){
      this.openCongruencial = true;

      //Set others to false
      this.openMiddleSquare = false;
      this.openCongruencialMixto = false;
      this.openMultiplicativo = false;
      this.openLinealCombinado = false;

    }

    if(name == 'congruencial-mixto'){
      this.openCongruencialMixto = true;

      //Set others to false
      this.openMiddleSquare = false;
      this.openCongruencial = false;
      this.openMultiplicativo = false;
      this.openLinealCombinado = false;

    }

    if(name == 'multiplicativo'){
      this.openMultiplicativo = true;

      //Set others to false
      this.openMiddleSquare = false;
      this.openCongruencialMixto = false;
      this.openCongruencial = false;
      this.openLinealCombinado = false;

    }


    this.close();
  }

  constructor() { }

  ngOnInit() {
  }

}
