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
  selector: 'app-multiplicativo',
  templateUrl: './multiplicativo.component.html',
  styleUrls: ['./multiplicativo.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
})
export class MultiplicativoComponent implements OnInit {

  public semilla: any = [];
  public random: any = [];
  public result: any = [];
  public randomService = new RandomService();

  public durationInSeconds = 5;

  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar) { }

  ngOnInit() {
  }

  multiplicativo = (seed, quantity, a, m) =>{
    this.cleanData();

    let counter = 0;
    let next_seed: number;
    let rnd: any;

    seed = parseInt(seed);
    quantity = parseInt(quantity)
    a = parseInt(a)
    m = parseInt(m)

    //Valicación HULLDOBELL
    /*let isValid = this.randomService.hullDobell(a,c,m);
    if(!isValid){
      this.openErrorDialog('Prueba no aceptaba por teorema de Hull-Dobell');
      return;
    }
    */
    this.openSuccessDialog()

    this.semilla.push(seed)

    while (counter < quantity) {
        next_seed = (a * seed) % m
        this.random.push(next_seed);
        rnd = next_seed / m
        console.log(rnd);
        this.result.push(Number(rnd).toFixed(4))
        seed = next_seed
        this.semilla.push(seed)
        counter += 1
    }

  }

  cleanData(){
    this.semilla = [];
    this.random = [];
    this.result = [];
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

}