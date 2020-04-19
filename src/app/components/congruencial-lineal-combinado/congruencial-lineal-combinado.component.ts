import { Component, OnInit } from '@angular/core';
import * as math from 'mathjs';
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
  public finalResult = [];
  

  

  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar) { }

  ngOnInit() {
  }

  linealCombinado = (quantity, modulo) =>{
    this.cleanData();

    modulo = parseInt(modulo);
    quantity = parseInt(quantity)


    let isValid = this.isValidCongruencial(quantity,modulo,this.seed,this.a,this.c,this.m, this.operador);
    if(!isValid){
      return;
    }
    
    //Si es valido abrir dialogo de exito
    this.openSuccessDialog();

  
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
      this.finalResult[i] = this.result[0][i];
      while(counter<this.n){
        switch(this.operador[counter]){
          case '+':
            this.finalResult[i] += this.result[counter+1][i];
            break;
          case '-':
            this.finalResult[i] -= this.result[counter+1][i];
            break;          
        }
        counter += 1
      }
    }

    console.log("FINAL RESULTS ANTES DE OPERACIONES", this.finalResult);

    //HACEMOS LA OPERACION DEL MODULO Y DIVIDIMOS ENTRE EL MODULO
    //finalResult = math.abs(finalResult);
    //console.log("FINAL RESULTS VALOR ABSOLUTO", finalResult);

    for(let i = 0; i<quantity;i++){
      //Modulo con numeros negativos no da resultado correcto
      this.finalResult[i] = ((((this.finalResult[i] % modulo)+ modulo) % modulo) / modulo).toFixed(4);
    }

    console.log("RESULTS",this.result);
    console.log("FINAL RESULTS DESPUES DE OPERACIONES", this.finalResult);


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
      panelClass: 'success-snackbar',
      verticalPosition: 'top'
    });
  }
  
  cleanData(){
    this.semilla = [];
    this.random = [];
    this.result = [];
    this.finalResult = [];
  }

  addNewGenerator(){
    this.nRandoms.push(1);
    console.log("N", this.nRandoms.length)
    this.n = this.nRandoms.length-1;
    //this.seed[n] = (<HTMLInputElement>document.getElementById('seed0')).value;

  }

  deleteGenerator(){
    this.nRandoms.pop();
    console.log("N", this.nRandoms.length)
    this.n = this.nRandoms.length-1;
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


  isValidCongruencial(quantity, modulo, seed, a,c,m, operador){
  
    if (!Number.isInteger(Number(quantity)) || !Number.isInteger(Number(modulo))) {
      this.openErrorDialog('Los datos no deben estar vacíos, deben ser enteros positivos y de tipo numérico')
      return false;
    }
  
    if(this.nRandoms.length == 0){
      this.openErrorDialog('Debes agregar por lo menos un generador')
      return false;
    }
    //Condiciones específicas
    /*
    0<m
    0<a<m
    0<=c<m
    0<=x0<m
    */

    for(let i = 0; i<this.nRandoms.length; i++){

      if (!Number.isInteger(Number(seed[i])) || !Number.isInteger(Number(a[i])) || !Number.isInteger(Number(c[i])) || !Number.isInteger(Number(m[i]))) {
        this.openErrorDialog('Los datos no deben estar vacíos, deben ser enteros positivos y de tipo numérico en los generadores')
        return false;
      }

      if(this.nRandoms.length!=0){
        if(i != this.n){
          if(operador[i] !== '+' && operador[i] !== '-'){
            this.openErrorDialog('Los operadores no deben estar vacios y deben ser válidos ( + , - ):' +i)
            return false;
          }
        }
      } 

      if(m[i] <= 0){
        this.openErrorDialog('El módulo debe ser mayor a 0. Generador:'+i);
        return false;
      }
    
      if(a[i] <= 0){
        this.openErrorDialog('El multiplicador debe ser mayor a 0. Generador:'+i);
        return false;
      }  
    
      if(a[i] > m[i]){
        this.openErrorDialog('El multiplicador debe ser menor al módulo. Generador:'+i);
        return false;
      }
    
      if(c[i] < 0){
        this.openErrorDialog('El incremento debe ser mayor o igual a cero. Generador:'+i);
        return false;
      }  
    
      if(c[i] > m[i]){
        this.openErrorDialog('El incremento debe ser menor al módulo. Generador:'+i);
        return false;
      }
    
      if(seed[i] < 0){
        this.openErrorDialog('La semilla debe ser mayor o igual a 0. Generador:'+i);
        return false;
      }  
    
      if(seed[i] > m[i]){
        this.openErrorDialog('La semilla debe ser menor al módulo. Generador: '+i);
        return false;
      }
    }
    return true;
    
  }

}
