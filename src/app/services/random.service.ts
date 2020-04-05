import { Injectable } from '@angular/core';

@Injectable()
export class RandomService {
  constructor() {
    console.log("Servicio listo para usarse");
   }


    testHullDobell = (_a, _c, _m) => {
        var a = parseInt(_a);
        var c = parseInt(_c);
        var m = parseInt(_m);
        var i: any;

        if (this.mcd(c, m) != 1) {
            return false;
        }
        if (((m % 4) != 0) && (((a-1) % 4) != 0)) {
            return false;
        }
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

}