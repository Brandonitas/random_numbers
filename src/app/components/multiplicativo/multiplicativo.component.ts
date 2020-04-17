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

  //Chi and Kolmogorov
  public validChi: boolean = false;
  public validKolmogorov: boolean = false;
  public chiResult;
  public kolResult;

  //Model
  public errorChi: any;
  public errorKol: any;  

  constructor(public snackBarSuccess: MatSnackBar,
              public snackBarError: MatSnackBar) { }

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
        this.chiResult = false;
      }
    }


    if(text === 'kolmogorov'){
      if($event.checked == true){
        this.validKolmogorov = true;
      }else{
        this.validKolmogorov = false;
        this.kolResult = false;
      }
    }


  }  

  multiplicativo = (seed, quantity, a, m) =>{
    this.cleanData();

    console.log("Error Chi",this.errorChi);
    console.log("Error Kol",this.errorKol);

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

   let isValid = this.isValidCongruencial(seed,quantity,a,0,m);
    if(!isValid){
      return;
    }
    
    //Si es valido abrir dialogo de exito    
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

    let arrayToValidate = this.result;   
    
    //Validar con Chi-Cuadrada
    if(this.validChi){
      if(this.errorChi < 0 || this.errorChi == 'undefined' || this.errorChi == null){
        this.openErrorDialog("Ingresa valores correctos de Aceptación para evaluar con Chi-Cuadrada");
      }else{
        this.chiResult = this.randomService.chiCuadrada(arrayToValidate, this.errorChi);
        if(this.chiResult){
          document.getElementById('chi-container').classList.add('green');
        }else{
          document.getElementById('chi-container').classList.add('red');
        }
      }
    }

    //Validar con Kolmogorox
    if(this.validKolmogorov){
      if(this.errorKol < 0 || this.errorKol == 'undefined' || this.errorKol == null){
        this.openErrorDialog("Ingresa valores correctos de Aceptación para evaluar con Kolmogorov");
      }else{
        this.kolResult = this.randomService.kolmogrovSmirnov(arrayToValidate, this.errorKol);
        if(this.kolResult){
          document.getElementById('kolmogorov-container').classList.add('green');
        }else{
          document.getElementById('kolmogorov-container').classList.add('red');
        }
      }
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

  isValidCongruencial(seed, quantity, a,c,m){
    //Validamos que no vengan vacías 
  
    /*if(seed < 0 || quantity < 0 || a < 0 || c < 0 || m < 0){
      this.openErrorDialog('No son permitidos los numeros negativos')
      return false;
    }*/
  
    if (!Number.isInteger(Number(seed)) || !Number.isInteger(Number(quantity)) || !Number.isInteger(Number(a)) || !Number.isInteger(Number(c))|| !Number.isInteger(Number(m))) {
      this.openErrorDialog('Los datos no deben estar vacíos, deben ser enteros positivos y de tipo numérico')
      return false;
    }
  
    //Condiciones específicas
    /*
    0<m
    0<a<m
    0<=c<m
    0<=x0<m
    */
  
    if(m <= 0){
      this.openErrorDialog('El módulo debe ser mayor a 0');
      return false;
    }
  
    if(a <= 0){
      this.openErrorDialog('El multiplicador debe ser mayor a 0');
      return false;
    }  
  
    if(a > m){
      this.openErrorDialog('El multiplicador debe ser menor al módulo');
      return false;
    }
  
    if(c < 0){
      this.openErrorDialog('El incremento debe ser mayor o igual a cero.');
      return false;
    }  
  
    if(c > m){
      this.openErrorDialog('El incremento debe ser menor al módulo.');
      return false;
    }
  
    if(seed < 0){
      this.openErrorDialog('La semilla debe ser mayor o igual a 0.');
      return false;
    }  
  
    if(seed > m){
      this.openErrorDialog('La semilla debe ser menor al módulo.');
      return false;
    }
  
    return true;
    
  }  

}
