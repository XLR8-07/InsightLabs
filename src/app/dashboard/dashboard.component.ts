import { Component, OnInit } from '@angular/core';
import { BcertAPIService } from '../shared/bcert-api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(public service : BcertAPIService) { }

  ngOnInit(): void {
    this.service.getUsers();
    this.service.getCourses();
  }

}
