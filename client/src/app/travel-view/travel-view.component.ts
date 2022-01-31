import { Component, OnInit } from '@angular/core';
import { TravelService } from '../travel.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-travel-view',
  templateUrl: './travel-view.component.html',
  styleUrls: ['./travel-view.component.css']
})
export class TravelViewComponent implements OnInit {

  travel = null;
  constructor(private route: ActivatedRoute,
    private router: Router,
    private travelService: TravelService) { }

  ngOnInit(): void {
    const param = this.route.snapshot.paramMap.get('id');
    const observable = this.travelService.read(param);
    observable.subscribe((destination) => {
      this.travel = destination;
    });
  }

  //deleting the destinations
  handleDelete(e) {
    const confirmDelete = confirm("Confirm deleting it");
    if (confirmDelete) {
      const observable = this.travelService.delete(this.travel._id);
      observable.subscribe((result) => {
        this.router.navigate(['/travel-list']);
      })
    }
  }
}
