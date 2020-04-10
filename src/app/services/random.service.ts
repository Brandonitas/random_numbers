import { Injectable } from '@angular/core';
import * as math from 'mathjs';
import * as jStat from 'jStat';

@Injectable()
export class RandomService {
  constructor() {
    console.log("Servicio listo para usarse");
   }


    hullDobell = (_a, _c, _m) => {
        var a = parseInt(_a);
        var c = parseInt(_c);
        var m = parseInt(_m);
        var i: any;

        //i)Sea c y m primos relativo  
        if (this.mcd(c, m) != 1) {
            return false;
        }

        //iii) Si 4 divide a m; entonces, 4 divide a (a-1). Es decir, 𝑎≡1𝑚𝑜𝑑4
        if (((m % 4) != 0) && (((a-1) % 4) != 0)) {
            return false;
        }

        //ii)Si q es un número primo que divide a m; entonces, q divide a (a-1)
        //Es decir; a -1 es divisible por todos los factores primos de m.
        var q = this.getPrimeFactors(m);
        for (i in q){
            if (((m % i) == 0) && (((a-1) % i) == 0)) {
                return true;
            }
        }
        return false;
    }

    getPrimeFactors = (num) => {
        /*
        Side algorithm to get prime primeFactors
        https://js-algorithms.tutorialhorizon.com/2015/09/27/find-all-the-prime-factors-for-the-given-number/
        */
        var primeFactors = [];
        while (num % 2 === 0) {
            primeFactors.push(2);
            num = num / 2;
        }
    
        var sqrtNum = Math.sqrt(num);
        for (var i = 3; i <= sqrtNum; i++) {
            while (num % i === 0) {
                primeFactors.push(i);
                num = num / i;
            }
        }
    
        if (num > 2) {
            primeFactors.push(num);
        }
        return primeFactors;
    }

    mcd = (a,b) =>{
        while(b){
            let temp = b;
            b = a % b;
            a = temp;
        }
        return Math.abs(a);
    }

    
    /*------------------*/
    /*---Chi Cuadrada---*/
    /*------------------*/



    chiCuadrada(numerosAleatorios, errorCC){
        let frecuenciasAbsolutas: any = [];
        let frecuenciasRelativas: any = [];
        let frecuenciaRelativaTeorica: any = 0; 
        let varianzaIndividualChiCuadrada: any = [];
        let chiCuadradaSum: number = 0;
        let clases: any = 0;
        
        let resultadoChi = this.ordenamientoPorMezcla(numerosAleatorios);
        numerosAleatorios = resultadoChi;

        console.log("Numeros ordenados", resultadoChi);

        let min = resultadoChi[0];
        console.log("Valor mínimo ",min);
        let max = resultadoChi[resultadoChi.length-1];
        console.log("Valor máximo ",max);
        let rango = max - min;
        console.log("Rango: ",rango);
        let k = Math.round(1 + 3.322*Math.log10(resultadoChi.length));
        console.log("La k es de: " +  k);
        clases = rango/k;
        console.log("Las clases irán como: " + clases);
        let index = 0;
        let j = 1;
    
        //FRECUENCIA ABSOLUTA Y RELATIVA
        let frecuenciaAbsoluta = 0;
        for(let i = 0; i<k; i++){
            while(resultadoChi[index]<=clases*j){
              console.log("Comparando: " + resultadoChi[index] + " es menor que: "+ clases*j);
              frecuenciaAbsoluta++;
              index++;
            }
          frecuenciasAbsolutas[i]=frecuenciaAbsoluta;
          frecuenciasRelativas[i]=frecuenciasAbsolutas[i]/resultadoChi.length;
          j++;
          frecuenciaAbsoluta = 0;
        }

        console.log("ABSOLUTA",frecuenciasAbsolutas);
        console.log("RELATIVA",frecuenciasRelativas);

        //FRECUENCIA TEORICA
        //Como es una distrubucion continua solo hay una teorica
        frecuenciaRelativaTeorica = (clases - min)/(max - min);
        console.log("TEORICA",frecuenciaRelativaTeorica);

        //(F0-FE)^2/FE 
        for(let i = 0; i<k; i++){ //Number(rnd).toFixed(4)
          varianzaIndividualChiCuadrada[i] = Number(Math.pow(frecuenciasRelativas[i]-frecuenciaRelativaTeorica,2)/frecuenciaRelativaTeorica).toFixed(4);
          console.log("Tipo", typeof varianzaIndividualChiCuadrada[i]);
          chiCuadradaSum += parseFloat(varianzaIndividualChiCuadrada[i]);
        }
        
        //chiCuadradaSum = parseFloat(chiCuadradaSum);

        console.log("VARIANZA INDIVIDUAL",varianzaIndividualChiCuadrada);

        //Revisar en tabla chi-cuadrada
        let v = k-1;
        let tabla = jStat.chisquare.inv(1 - (errorCC/100), v);
        console.log("TABLA", tabla);
        console.log("SUMA", chiCuadradaSum);
        let pass = chiCuadradaSum < tabla;

        //RESULTADO
        if(pass){
            console.log("Se rechaza H1, y se acepta H0, es decir, todos los números aleatorios, tienen la misma probabilidad de generarse, con una tolerancia del: " + errorCC + " %");
            return true;
        }else{          
            console.log("Se rechaza H0, y se acepta H1, es decir,los números aleatorios, no tienen la misma probabilidad de generarse");
            return false;
        }
      }




    /*------------------*/
    /*----Kolmogorov----*/
    /*------------------*/     
    
    kolmogrovSmirnov(numerosAleatorios, errorKS){
        let errorKolmogrov: any = 0;
        let i_n: any = [];
        let i_nRI: any = [];
        let r_iIN: any = [];
        let respuestaKS : any = "";

        let resultado = this.ordenamientoPorMezcla(numerosAleatorios);
        numerosAleatorios = resultado;

        console.log("Numeros ordenados", resultado);

        errorKolmogrov = errorKS;
        /*for(let i = 1; i<=resultado.length; i++){
          i_n[i-1] = i/resultado.length;
          i_nRI[i-1] = i_n[i-1] - resultado[i-1];
          r_iIN[i-1] = resultado[i-1] - (i-1/resultado.length);
        }
        i_nRI = math.sort(i_nRI);
        r_iIN = math.sort(r_iIN);
        let dMin = Math.abs(r_iIN[0]);
        let dMax = Math.abs(i_nRI[i_nRI.length]);
        let max = 0;
        (dMin>dMax?max=dMin:max=dMax);
        if(max > errorKolmogrov){
          console.log("Se rechaza H0, y se acepta H1, es decir,los números aleatorios, no tienen la misma probabilidad de generarse");
          return true;
        }else{
          console.log("Se rechaza H1, y se acepta H0, es decir, todos los números aleatorios, tienen la misma probabilidad de generarse, con una tolerancia del: " + this.errorKolmogrov + " %");
          return false;
        }*/
    
      }    


    /*---------------------*/
    /*----Ordenamientos----*/
    /*---------------------*/ 

      ordenamientoPorMezcla(numerosDesordenados) {
        // Caso Base, cuando el arreglo sea de tamaño 1 o 0, entonces
        // no se ordena.
        if(numerosDesordenados.length <= 1){
            return numerosDesordenados;
        }
        // Encontrar la posición intermedia del tamaño del arreglo
        let mitad = (numerosDesordenados.length /2);
        // Crear arreglos divididos
        let izquierda = [] = numerosDesordenados.slice(0,mitad);
        let derecha = [] = numerosDesordenados.slice(mitad);
        // Recursión con merge.
        return this.mezcla(this.ordenamientoPorMezcla(izquierda), this.ordenamientoPorMezcla(derecha));
      }
    
      mezcla(izquierda, derecha) {
        
        let numerosResultado = [];
        let indiceIzquierdo = 0;
        let indiceDerecho = 0;
        while(indiceIzquierdo < izquierda.length && indiceDerecho < derecha.length){
          
            if(izquierda[indiceIzquierdo]<derecha[indiceDerecho]){
              numerosResultado.push(izquierda[indiceIzquierdo]);
              indiceIzquierdo++;
            }else{
              numerosResultado.push(derecha[indiceDerecho]);
              indiceDerecho++;
            }
        }
        return numerosResultado.concat(izquierda.slice(indiceIzquierdo)).concat(derecha.slice(indiceDerecho));
      }

    
}