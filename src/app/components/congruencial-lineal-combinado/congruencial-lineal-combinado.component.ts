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
  selector: 'app-congruencial-lineal-combinado',
  templateUrl: './congruencial-lineal-combinado.component.html',
  styleUrls: ['./congruencial-lineal-combinado.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ]
})
export class CongruencialLinealCombinadoComponent implements OnInit {
  public semilla: any = [];
  public random: any = [];
  public result: any = [];
  public randomService = new RandomService();

  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar) { }

  ngOnInit() {
  }

  linealCombinado = (k,quantity) => {
    

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
