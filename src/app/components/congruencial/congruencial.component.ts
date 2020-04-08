import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import {RandomService} from '../../services/random.service';
import { MatSnackBar } from "@angular/material";

@Component({
  selector: 'app-congruencial',
  templateUrl: './congruencial.component.html',
  styleUrls: ['./congruencial.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class CongruencialComponent implements OnInit {

  public semilla: any = [];
  public random: any = [];
  public result: any = [];
  public randomService = new RandomService();

  //Chi and Kolmogorov
  public validChi: boolean = false;
  public validKolmogorov: boolean = false;

  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar,
              ) {}

  ngOnInit() {
  }

  onChange($event, text){
    console.log($event.checked);
    console.log(text); 

    if(text === 'chi'){
      if($event.checked == true){
        this.validChi = true;
      }else{
        this.validChi = false;
      }
    }


    if(text === 'kolmogorov'){
      if($event.checked == true){
        this.validKolmogorov = true;
      }else{
        this.validKolmogorov = false;
      }
    }


  }

  congruencial = (seed, quantity, a, c, m) => {
    this.cleanData();

    let counter = 0;
    let next_seed: number;
    let rnd: any;

    seed = parseInt(seed);
    quantity = parseInt(quantity)
    a = parseInt(a)
    c = parseInt(c)
    m = parseInt(m)

    this.semilla.push(seed)

    while (counter < quantity) {
        next_seed = (a * seed + c) % m
        this.random.push(next_seed);
        rnd = next_seed / m
        console.log(rnd);
        this.result.push(Number(rnd).toFixed(4))
        seed = next_seed
        this.semilla.push(seed)
        counter += 1
    }
}

openErrorDialog(error){
  this.snackBarError.open("Error: "+ error, "", {
    duration: 6000,
    panelClass: 'error-snackbar'
  });
}

openSuccessDialog(){
  this.snackBarSuccess.open("Randoms generados con éxito", "", {
    duration: 3000,
    panelClass: 'success-snackbar'
  });
}

cleanData(){
  this.semilla = [];
  this.random = [];
  this.result = [];
}



}
