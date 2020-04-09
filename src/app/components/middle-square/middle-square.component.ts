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

    //Validamos 
    let isValid = this.isValidMiddleSquare(seed, quantity);
    if(!isValid){
      return;
    }
    

    this.openSuccessDialog();
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

  }

  openErrorDialog(error){
    this.snackBarError.open("Error: "+ error, "", {
      duration: 3000,
      panelClass: 'error-snackbar'
    });
  }
  
  openSuccessDialog(){
    this.snackBarSuccess.open("Randoms generados con éxito", "", {
      duration: 3000,
      panelClass: 'success-snackbar',
      verticalPosition: 'top'
    });
  }

  cleanData(){
    this.semilla = [];
    this.random = [];
    this.result = [];
  }

  isValidMiddleSquare(seed, quantity){
    //Validamos que no vengan vacías 
    if(seed.length === 0 || quantity.length === 0 ){
      this.openErrorDialog('Los campos no deben estar vacíos')
      return false;
    }

    if(seed < 0 || quantity < 0){
      this.openErrorDialog('No son permitidos los numeros negativos')
      return false;
    }

    if (!Number.isInteger(Number(seed)) || !Number.isInteger(Number(quantity))) {
      this.openErrorDialog('Los datos deben ser enteros')
      return false;
    }

    //Validamos que la semilla sea de 4 digitos
    if(seed.length != 4){
      this.openErrorDialog('La semilla debe ser de 4 dígitos')
      return false;
    }

    return true;
    
  }

}
