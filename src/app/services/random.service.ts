import { Injectable } from '@angular/core';
import { math } from 'mathjs';

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


    /*chi_cuadrada = (numbers, alpha) =>{
        //Definimos variables que usaremos 
        let n = numbers.length;
        let min = Math.min(numbers);
        let max = Math.min(numbers);
        let rango = max-min;
        let k = Math.floor(1 + 3.322 * Math.log10(n))
        let size = rango/k;
        size = Number(size.toFixed(4))
        let v = k - 1; 
        let media = math.mean(numbers);
        let lambda = 1 / media;
        let distribucion = 'uniforme';

        // Absolute
        let observedAbs = []
        let classRange = []
        let floor = min        

        for (var i = 0; i < k; i++) {
            classRange.push(floor)
            let top = floor + size
            let count = 0
            for (var j = 0; j < n; j++) {
                if ((i + 1) == k) {
                    if (numbers[j] >= floor && numbers[j] <= top)
                        count += 1
                }
                else {
                    if (numbers[j] >= floor && numbers[j] < top)
                        count += 1
                }
            }
            observedAbs.push(count)
            floor = top
        }
        classRange.push(floor)

    }*/

      // Chi Cuadrada
    public frecuenciasAbsolutas: any = [];
    public frecuenciasRelativas: any = [];
    public frecuenciaRelativaTeorica: any; 
    public varianzaIndividualChiCuadrada: any = [];
    public chiCuadradaSum: any;
    public clases: any;
    public respuesta: any;
    public errorCC: any;
    public numerosAleatorios: any = [];

    chiCuadrada(numerosAleatorios, error){
        let resultado = this.ordenamientoPorMezcla(numerosAleatorios);
        this.numerosAleatorios = resultado;
        let min = resultado[0];
        let max = resultado[resultado.length-1];
        let rango = max - min;
        let k = Math.round(1 + 3.322*Math.log10(resultado.length));
        console.log("La k es de: " +  k);
        this.clases = rango/k;
        console.log("Las clases irán como: " + this.clases);
        let index = 0;
        let j = 1;
        this.errorCC = 5;

        //FRECUENCIA ABSOLUTA Y RELATIVA
        let frecuenciaAbsoluta = 0;
        for(let i = 0; i<k; i++){
            while(resultado[index]<=this.clases*j){
              console.log("Comparando: " + resultado[index] + " es menor que: "+ this.clases*j);
              frecuenciaAbsoluta++;
              index++;
            }
          this.frecuenciasAbsolutas[i]=frecuenciaAbsoluta;
          this.frecuenciasRelativas[i]=this.frecuenciasAbsolutas[i]/resultado.length;
          j++;
          frecuenciaAbsoluta = 0;
        }

        console.log("ABSOLUTA",this.frecuenciasAbsolutas);
        console.log("RELATIVA",this.frecuenciasRelativas);

        //FRECUENCIA TEORICA
        //Como es una distrubucion continua solo hay una teorica
        this.frecuenciaRelativaTeorica = (this.clases - min)/(max - min);
        console.log("TEORICA",this.frecuenciaRelativaTeorica);

        //(F0-FE)^2/FE 
        for(let i = 0; i<k; i++){
          this.varianzaIndividualChiCuadrada[i] = Math.pow(this.frecuenciasRelativas[i]-this.frecuenciaRelativaTeorica,2)/this.frecuenciaRelativaTeorica;
          this.chiCuadradaSum += this.varianzaIndividualChiCuadrada[i];
        }
        console.log("VARIANZA INDIVIDUAL",this.varianzaIndividualChiCuadrada);

        //RESULTADO
        if(this.chiCuadradaSum>(1+(this.errorCC/100) || (this.chiCuadradaSum<(1-(this.errorCC/100))))){
            this.respuesta = ("Se rechaza H0, y se acepta H1, es decir,los números aleatorios, no tienen la misma probabilidad de generarse");
            return false;
        }else{
          this.respuesta = ("Se rechaza H1, y se acepta H0, es decir, todos los números aleatorios, tienen la misma probabilidad de generarse, con una tolerancia del: " + this.errorCC + " %");
          return true;
        }
      }
    
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