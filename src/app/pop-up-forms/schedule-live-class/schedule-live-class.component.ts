import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm } from '@angular/forms';
import { BcertAPIService } from 'src/app/shared/bcert-api.service';

@Component({
  selector: 'app-schedule-live-class',
  templateUrl: './schedule-live-class.component.html',
  styleUrls: ['./schedule-live-class.component.scss']
})
export class ScheduleLiveClassComponent implements OnInit {

  constructor(public service : BcertAPIService) { }

  ngOnInit(): void {
    this.resetForm();
  }

  onClick(){
    console.log(this.service.ScheduleLiveClassFormData.title);
  }

  onSubmit(form : NgForm){
    this.service.scheduleALiveClass(form.value).subscribe(result =>{
      console.log(result);
      this.resetForm(form);
    })
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
    this.service.ScheduleLiveClassFormData={
      title : "",
      timezone : 12,
      start_time : "",
      end_time : "",
      date : ""
    }
  }
}
