import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-middle-square',
  templateUrl: './middle-square.component.html',
  styleUrls: ['./middle-square.component.scss']
})
export class MiddleSquareComponent implements OnInit {

  public semilla: any = [];
  public random: any = [];
  public result: any = [];


  constructor() { }

  ngOnInit() {
  }

  middle_square = (seed, quantity) => {
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

}
