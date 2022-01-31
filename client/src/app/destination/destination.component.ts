import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.css']
})
export class DestinationComponent implements OnInit {

  @Input() travel;

  basket = false;


  constructor() { }

  ngOnInit(): void {
  }

  handleBasket(evt) {
    this.basket = !this.basket
  }
}
