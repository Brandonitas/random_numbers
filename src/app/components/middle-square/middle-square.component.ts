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
  selector: 'app-middle-square',
  templateUrl: './middle-square.component.html',
  styleUrls: ['./middle-square.component.scss'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: '0' }),
        animate('1s ease-out', style({ opacity: '1' })),
      ]),
    ]),
  ],
})
export class MiddleSquareComponent implements OnInit {

  public semilla: any = [];
  public random: any = [];
  public result: any = [];
  public randomService = new RandomService();


  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar) { }

  ngOnInit() {
    
  }

  middle_square = (seed, quantity) => {
    this.cleanData();

    this.openSuccessDialog();

    let counter = 0;
    let Xi: number; 
    let Xistring: string;
    let next_seed: number;
    let rnd: any;
    this.semilla.push(seed);

    while(counter < quantity){
      Xi = Math.pow(seed,2);
      Xistring = Xi.toString();
      if(Xistring.length<8){
        Xistring = Xistring.padStart(8, '0');
      }
      next_seed = parseInt(Xistring.substr(2,4))
      this.semilla.push(next_seed);
      rnd = next_seed
      this.random.push(rnd);
      rnd = rnd / 10000;
      rnd = Number (rnd).toFixed(4);
      if(this.result.includes(rnd)){
        this.result.push(rnd);
        break;
      }
      if(!this.result.includes(rnd)){
        this.result.push(rnd);
      }
    
      seed= next_seed
      counter += 1
    }

    console.log(this.semilla);
    //return result
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
