import { Component, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.css'],
  providers: [TravelService]
})
export class TravelListComponent implements OnInit {

  lastAdded: string;
  lastDeleted: string;

  travelList;

  constructor(private travelService: TravelService) { }

  ngOnInit(): void {
    const observable = this.travelService.list();
    observable.subscribe((travel) => {
      this.travelList = travel;
    });
  }

  handleBasketEvent(destinationName) {
    this.lastAdded = destinationName;
  }

  handleBasketEventDeleted(destinationName) {
    this.lastDeleted = destinationName;
  }

}
