import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congruencial',
  templateUrl: './congruencial.component.html',
  styleUrls: ['./congruencial.component.scss']
})
export class CongruencialComponent implements OnInit {

  public semilla: any = [];
  public random: any = [];
  public result: any = [];

  constructor() { }

  ngOnInit() {
  }

  congruencial = (seed, quantity, a, c, m) => {
    let counter = 0;
    let next_seed: number;
    let rnd: any;

    seed = parseInt(seed);
    quantity = parseInt(quantity)
    a = parseInt(a)
    c = parseInt(c)
    m = parseInt(m)

    this.semilla.push(seed)

    while (counter < quantity) {
        next_seed = (a * seed + c) % m
        this.random.push(next_seed);
        rnd = next_seed / m
        console.log(rnd);
        this.result.push(Number(rnd).toFixed(4))
        seed = next_seed
        this.semilla.push(seed)
        counter += 1
    }
}

}
