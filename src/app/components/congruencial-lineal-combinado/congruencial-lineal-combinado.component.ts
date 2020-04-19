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
  ],
})
export class CongruencialLinealCombinadoComponent implements OnInit {
  public semilla: any = [];
  public random: any = [];
  public result = [];
  public randomService = new RandomService();
  public nRandoms = [];
  public seed = [];
  public a = [];
  public c = [];
  public m = [];
  public operador = [];
  public n = 0;
  

  

  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar) { }

  ngOnInit() {
  }

  linealCombinado = (quantity, modulo) =>{
    this.cleanData();

    modulo = parseInt(modulo);
    quantity = parseInt(quantity)
    
    /*let isValid = this.isValidCongruencial(seed,quantity,a,c,m);
    if(!isValid){
      return;
    }*/

    //Si es valido abrir dialogo de exito
    this.openSuccessDialog();

    let finalResult = [];
    //this.semilla.push(seed)
    for(let i = 0; i<=this.n;i++){
      let counter = 0;
      let next_seed: number;
      this.result[i] = [];
      let previous_seed = this.seed[i];
      while (counter < quantity) {
          next_seed = (this.a[i] * previous_seed + this.c[i]) % this.m[i];
          this.result[i][counter] = next_seed;
          previous_seed = next_seed;
          counter += 1
      }
      
    }
    /*
    [0,0 = 4][0,1][0,2][*][]
    [3][][][][]
    [5][][][][]
    [10][][][][]

    [4+3+3+5+5+10+10][][][][]
    */

    for(let i = 0; i<quantity;i++){
      let counter = 0;
      finalResult[i] = this.result[0][i];
      while(counter<this.n){
        switch(this.operador[counter]){
          case '+':
            finalResult[i] += this.result[counter+1][i];
            break;
          case '-':
            finalResult[i] -= this.result[counter+1][i];
            break;          
        }
        counter += 1
      }
    }

    console.log("RESULTS",this.result);
    console.log("FINAL RESULTS", finalResult);


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

  addNewGenerator(){
    this.nRandoms.push(1);
    console.log("N", this.nRandoms.length)
    this.n = this.nRandoms.length-1;
    //this.seed[n] = (<HTMLInputElement>document.getElementById('seed0')).value;

    console.log("ESTE ES MI VALOR WII",this.seed[this.n]);

  }

  addGenerator($scope){
 
  }

  onKeySeed(event: any ,i:number){
    this.seed[i] = parseInt(event.target.value);
    console.log("SEED"+i, this.seed[i]);
  }

  onKeyA(event: any ,i:number){
    this.a[i] = parseInt(event.target.value);
    console.log("A"+i, this.a[i]);
  }

  onKeyC(event: any ,i:number){
    this.c[i] = parseInt(event.target.value);
    console.log("C"+i, this.c[i]);
  }

  onKeyM(event: any ,i:number){
    this.m[i] = parseInt(event.target.value);
    console.log("M"+i, this.m[i]);
  }

  onKeyOperador(event: any ,i:number){
    this.operador[i] = event.target.value;
    console.log("OPERADOR"+i, this.operador[i]);
  }

}
