import { Component, OnInit, Inject } from '@angular/core';
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
  selector: 'app-congruencial-mixto',
  templateUrl: './congruencial-mixto.component.html',
  styleUrls: ['./congruencial-mixto.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class CongruencialMixtoComponent implements OnInit {

  public semilla: any = [];
  public random: any = [];
  public result: any = [];
  public randomService = new RandomService();

  public durationInSeconds = 5;

  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar) { }

  ngOnInit() {
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

    //Valicación HULLDOBELL
    let isValid = this.randomService.testHullDobell(a,c,m);
    if(!isValid){
      this.openErrorDialog('Prueba no aceptaba por teorema de Hull-Dobell');
      return;
    }

    this.openSuccessDialog();

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

