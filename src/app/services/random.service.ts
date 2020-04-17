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

        errorKolmogrov = errorKS / 100;
        for(let i = 1; i<=resultado.length; i++){
          i_n[i-1] = i/resultado.length;
          i_nRI[i-1] = i_n[i-1] - resultado[i-1];
          r_iIN[i-1] = numerosAleatorios[i-1] - ((i-1)/numerosAleatorios.length);
          console.log("i_n",i_n[i-1]);
          console.log("i_nRi",i_nRI[i-1]);
          console.log("r_iIN",r_iIN[i-1]);
        }
        i_nRI = math.abs(i_nRI);
        r_iIN = math.abs(r_iIN);
        i_nRI = math.sort(i_nRI);
        r_iIN = math.sort(r_iIN);
        let dMin = r_iIN[r_iIN.length-1];
        let dMax = i_nRI[i_nRI.length-1];
        let max = 0;

        console.log("dmin",dMin);
        console.log("dmax",dMax);
        (dMin>dMax?max=dMin:max=dMax);
        console.log("VALOR DE MAX", max);

        let n = numerosAleatorios.length;
        if(n>50){
            n = 50;
        }

        let errorRedondeado = 0;

        if (errorKolmogrov!= 0.2 || errorKolmogrov!= 0.15 || errorKolmogrov!= 0.1 || errorKolmogrov!= 0.05 || errorKolmogrov!= 0.01 || errorKolmogrov!= 0.005 || errorKolmogrov!= 0.002 || errorKolmogrov!= 0.001) {
            let errorActual = errorKolmogrov;
            let erroresDisponibles = [0.001, 0.002, 0.005, 0.01, 0.05, 0.1, 0.15, 0.2];
            errorRedondeado = erroresDisponibles.reduce(
              function(anterior, actual) {
                if(Math.abs(actual - errorActual) < Math.abs(anterior - errorActual)){
                   return actual;
                   }else{
                    return anterior;
                   }
            });
            
      
        }
        console.log("ERROR REDONDEADO: ", errorRedondeado);
        
        let tabla = this.tablaKolmogrovS[String(n)][String(errorRedondeado)];
        console.log("VALOR TABLA KOLMOGOROV: ", tabla);
        if(max > tabla){
          return false;
        }else{
          return true;
        }
        
        
      }    


      tablaKolmogrovS = {
        "1": {
           "0.20": 0.9,
           "0.15": 0.925,
           "0.1": 0.95,
           "0.05": 0.975,
           "0.01": 0.995,
           "0.005": 0.9975,
           "0.002": 0.999,
           "0.001": 0.9995
        },
        "2": {
           "0.20": 0.68337,
           "0.15": 0.726,
           "0.1": 0.77639,
           "0.05": 0.84189,
           "0.01": 0.92929,
           "0.005": 0.95,
           "0.002": 0.96838,
           "0.001": 0.97764
        },
        "3": {
           "0.20": 0.56481,
           "0.15": 0.597,
           "0.1": 0.63604,
           "0.05": 0.7076,
           "0.01": 0.829,
           "0.005": 0.86428,
           "0.002": 0.9,
           "0.001": 0.92065
        },
        "4": {
           "0.20": 0.49265,
           "0.15": 0.525,
           "0.1": 0.56522,
           "0.05": 0.62394,
           "0.01": 0.73424,
           "0.005": 0.77639,
           "0.002": 0.82217,
           "0.001": 0.85047
        },
        "5": {
           "0.20": 0.44698,
           "0.15": 0.474,
           "0.1": 0.50945,
           "0.05": 0.56328,
           "0.01": 0.66853,
           "0.005": 0.70543,
           "0.002": 0.75,
           "0.001": 0.78137
        },
        "6": {
           "0.20": 0.41037,
           "0.15": 0.436,
           "0.1": 0.46799,
           "0.05": 0.51926,
           "0.01": 0.61661,
           "0.005": 0.65287,
           "0.002": 0.69571,
           "0.001": 0.72479
        },
        "7": {
           "0.20": 0.38148,
           "0.15": 0.405,
           "0.1": 0.43607,
           "0.05": 0.48342,
           "0.01": 0.57581,
           "0.005": 0.60287,
           "0.002": 0.69571,
           "0.001": 0.72479
        },
        "8": {
           "0.20": 0.35831,
           "0.15": 0.381,
           "0.1": 0.40962,
           "0.05": 0.45427,
           "0.01": 0.54179,
           "0.005": 0.57429,
           "0.002": 0.61368,
           "0.001": 0.64098
        },
        "9": {
           "0.20": 0.3391,
           "0.15": 0.36,
           "0.1": 0.38746,
           "0.05": 0.43001,
           "0.01": 0.51332,
           "0.005": 0.54443,
           "0.002": 0.5821,
           "0.001": 0.60846
        },
        "10": {
           "0.20": 0.32260,
           "0.15": 0.342,
           "0.1": 0.36866,
           "0.05": 0.40925,
           "0.01": 0.48893,
           "0.005": 0.51872,
           "0.002": 0.555,
           "0.001": 0.58042
        },
        "11": {
           "0.20": 0.30829,
           "0.15": 0.326,
           "0.1": 0.35242,
           "0.05": 0.39122,
           "0.01": 0.4677,
           "0.005": 0.49539,
           "0.002": 0.53135,
           "0.001": 0.55588
        },
        "12": {
           "0.20": 0.29577,
           "0.15": 0.313,
           "0.1": 0.33815,
           "0.05": 0.37543,
           "0.01": 0.44905,
           "0.005": 0.47672,
           "0.002": 0.51047,
           "0.001": 0.53422
        },
        "13": {
           "0.20": 0.2847,
           "0.15": 0.302,
           "0.1": 0.32549,
           "0.05": 0.36143,
           "0.01": 0.43247,
           "0.005": 0.45921,
           "0.002": 0.49189,
           "0.001": 0.5149
        },
        "14": {
           "0.20": 0.27481,
           "0.15": 0.292,
           "0.1": 0.31417,
           "0.05": 0.3489,
           "0.01": 0.41762,
           "0.005": 0.44352,
           "0.002": 0.4752,
           "0.001": 0.49753
        },
        "15": {
           "0.20": 0.26589,
           "0.15": 0.283,
           "0.1": 0.30397,
           "0.05": 0.3375,
           "0.01": 0.4042,
           "0.005": 0.42934,
           "0.002": 0.45611,
           "0.001": 0.48182
        },
        "16": {
           "0.20": 0.25778,
           "0.15": 0.274,
           "0.1": 0.29472,
           "0.05": 0.32733,
           "0.01": 0.39201,
           "0.005": 0.41644,
           "0.002": 0.44637,
           "0.001": 0.46750
        },
        "17": {
           "0.20": 0.25039,
           "0.15": 0.266,
           "0.1": 0.28627,
           "0.05": 0.318,
           "0.01": 0.38086,
           "0.005": 0.40464,
           "0.002": 0.4338,
           "0.001": 0.45540
        },
        "18": {
           "0.20": 0.2436,
           "0.15": 0.259,
           "0.1": 0.27851,
           "0.05": 0.30936,
           "0.01": 0.37062,
           "0.005": 0.40464,
           "0.002": 0.4338,
           "0.001": 0.45540
        },
        "19": {
           "0.20": 0.23735,
           "0.15": 0.252,
           "0.1": 0.27136,
           "0.05": 0.30143,
           "0.01": 0.36117,
           "0.005": 0.38379,
           "0.002": 0.41156,
           "0.001": 0.43119
        },
        "20": {
           "0.20": 0.23156,
           "0.15": 0.246,
           "0.1": 0.26473,
           "0.05": 0.29408,
           "0.01": 0.35241,
           "0.005": 0.37451,
           "0.002": 0.40165,
           "0.001": 0.42085
        },
         "21": {
           "0.20": 0.22517,
           "0.15": 0.236,
           "0.1": 0.25858,
           "0.05": 0.28724,
           "0.01": 0.34426,
           "0.005": 0.36588,
           "0.002": 0.39243,
           "0.001": 0.42085
        },
         "22": {
           "0.20": 0.22517,
           "0.15": 0.236,
           "0.1": 0.25858,
           "0.05": 0.28724,
           "0.01": 0.34426,
           "0.005": 0.36588,
           "0.002": 0.39243,
           "0.001": 0.42085
        },
         "23": {
           "0.20": 0.2079,
           "0.15": 0.22542,
           "0.1": 0.23768,
           "0.05": 0.26404,
           "0.01": 0.31657,
           "0.005": 0.33651,
           "0.002": 0.36104,
           "0.001": 0.37743
        },
         "24": {
           "0.20": 0.2079,
           "0.15": 0.22542,
           "0.1": 0.23768,
           "0.05": 0.26404,
           "0.01": 0.31657,
           "0.005": 0.33651,
           "0.002": 0.36104,
           "0.001": 0.37743
        },
        "25": {
           "0.20": 0.2079,
           "0.15": 0.22542,
           "0.1": 0.23768,
           "0.05": 0.26404,
           "0.01": 0.31657,
           "0.005": 0.33651,
           "0.002": 0.36104,
           "0.001": 0.37743
        },
         "26": {
           "0.20": 0.2079,
           "0.15": 0.22542,
           "0.1": 0.23768,
           "0.05": 0.26404,
           "0.01": 0.31657,
           "0.005": 0.33651,
           "0.002": 0.36104,
           "0.001": 0.37743
        },
         "27": {
           "0.20": 0.2079,
           "0.15": 0.22542,
           "0.1": 0.23768,
           "0.05": 0.26404,
           "0.01": 0.31657,
           "0.005": 0.33651,
           "0.002": 0.36104,
           "0.001": 0.37743
        },
         "28": {
           "0.20": 0.19348,
           "0.15": 0.2156,
           "0.1": 0.22117,
           "0.05": 0.24571,
           "0.01": 0.29466,
           "0.005": 0.31327,
           "0.002": 0.33617,
           "0.001": 0.35242
        },
         "29": {
           "0.20": 0.19348,
           "0.15": 0.2156,
           "0.1": 0.22117,
           "0.05": 0.24571,
           "0.01": 0.29466,
           "0.005": 0.31327,
           "0.002": 0.33617,
           "0.001": 0.35242
        },
        "30": {
           "0.20": 0.19032,
           "0.15": 0.20342,
           "0.1": 0.21756,
           "0.05": 0.24170,
           "0.01": 0.28986,
           "0.005": 0.30818,
           "0.002": 0.33072,
           "0.001": 0.33072
        },
        "31": {
           "0.20": 0.18732,
           "0.15": 0.1997,
           "0.1": 0.21412,
           "0.05": 0.23788,
           "0.01": 0.28529,
           "0.005": 0.30333,
           "0.002": 0.33325,
           "0.001": 0.34129
        },
         "32": {
           "0.20": 0.18732,
           "0.15": 0.1997,
           "0.1": 0.21412,
           "0.05": 0.23788,
           "0.01": 0.28529,
           "0.005": 0.30333,
           "0.002": 0.33325,
           "0.001": 0.34129
        },
         "33": {
           "0.20": 0.18732,
           "0.15": 0.1997,
           "0.1": 0.21412,
           "0.05": 0.23788,
           "0.01": 0.28529,
           "0.005": 0.30333,
           "0.002": 0.33325,
           "0.001": 0.34129
        },
         "34": {
           "0.20": 0.17659,
           "0.15": 0.18932,
           "0.1": 0.20185,
           "0.05": 0.22425,
           "0.01": 0.26897,
           "0.005": 0.286,
           "0.002": 0.30597,
           "0.001": 0.32187
        },
         "35": {
           "0.20": 0.17659,
           "0.15": 0.18932,
           "0.1": 0.20185,
           "0.05": 0.22425,
           "0.01": 0.26897,
           "0.005": 0.286,
           "0.002": 0.30597,
           "0.001": 0.32187
        },
         "36": {
           "0.20": 0.17659,
           "0.15": 0.18932,
           "0.1": 0.20185,
           "0.05": 0.22425,
           "0.01": 0.26897,
           "0.005": 0.286,
           "0.002": 0.30597,
           "0.001": 0.32187
        },
         "37": {
           "0.20": 0.16547,
           "0.15": 0.17932,
           "0.1": 0.18913,
           "0.05": 0.21012,
           "0.01": 0.25205,
           "0.005": 0.26803,
           "0.002": 0.28772,
           "0.001": 0.30171
        },
         "38": {
           "0.20": 0.16547,
           "0.15": 0.17932,
           "0.1": 0.18913,
           "0.05": 0.21012,
           "0.01": 0.25205,
           "0.005": 0.26803,
           "0.002": 0.28772,
           "0.001": 0.30171
        },
         "39": {
           "0.20": 0.16547,
           "0.15": 0.17932,
           "0.1": 0.18913,
           "0.05": 0.21012,
           "0.01": 0.25205,
           "0.005": 0.26803,
           "0.002": 0.28772,
           "0.001": 0.30171
        },
         "40": {
           "0.20": 0.16547,
           "0.15": 0.17932,
           "0.1": 0.18913,
           "0.05": 0.21012,
           "0.01": 0.25205,
           "0.005": 0.26803,
           "0.002": 0.28772,
           "0.001": 0.30171
        },
         "41": {
           "0.20": 0.16547,
           "0.15": 0.17932,
           "0.1": 0.18913,
           "0.05": 0.21012,
           "0.01": 0.25205,
           "0.005": 0.26803,
           "0.002": 0.28772,
           "0.001": 0.30171
        },
         "42": {
           "0.20": 0.16547,
           "0.15": 0.17932,
           "0.1": 0.18913,
           "0.05": 0.21012,
           "0.01": 0.25205,
           "0.005": 0.26803,
           "0.002": 0.28772,
           "0.001": 0.30171
        },
         "43": {
           "0.20": 0.15623,
           "0.15": 0.16712,
           "0.1": 0.17856,
           "0.05": 0.19837,
           "0.01": 0.23798,
           "0.005": 0.25308,
           "0.002": 0.27169,
           "0.001": 0.28493
        },
         "44": {
           "0.20": 0.15623,
           "0.15": 0.16712,
           "0.1": 0.17856,
           "0.05": 0.19837,
           "0.01": 0.23798,
           "0.005": 0.25308,
           "0.002": 0.27169,
           "0.001": 0.28493
        },
         "45": {
           "0.20": 0.15623,
           "0.15": 0.16712,
           "0.1": 0.17856,
           "0.05": 0.19837,
           "0.01": 0.23798,
           "0.005": 0.25308,
           "0.002": 0.27169,
           "0.001": 0.28493
        },
         "46": {
           "0.20": 0.15623,
           "0.15": 0.16712,
           "0.1": 0.17856,
           "0.05": 0.19837,
           "0.01": 0.23798,
           "0.005": 0.25308,
           "0.002": 0.27169,
           "0.001": 0.28493
        },
         "47": {
           "0.20": 0.15623,
           "0.15": 0.16712,
           "0.1": 0.17856,
           "0.05": 0.19837,
           "0.01": 0.23798,
           "0.005": 0.25308,
           "0.002": 0.27169,
           "0.001": 0.28493
        },
         "48": {
           "0.20": 0.14840,
           "0.15": 0.15712,
           "0.1": 0.16959,
           "0.05": 0.18841,
           "0.01": 0.22606,
           "0.005": 0.24039,
           "0.002": 0.25809,
           "0.001": 0.27067
        },
         "49": {
           "0.20": 0.14840,
           "0.15": 0.15712,
           "0.1": 0.16959,
           "0.05": 0.18841,
           "0.01": 0.22606,
           "0.005": 0.24039,
           "0.002": 0.25809,
           "0.001": 0.27067
        },
         "50": {
           "0.20": 0.14840,
           "0.15": 0.15712,
           "0.1": 0.16959,
           "0.05": 0.18841,
           "0.01": 0.22606,
           "0.005": 0.24039,
           "0.002": 0.25809,
           "0.001": 0.27067
        }
     };      






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