import { Component, OnInit } from '@angular/core';
import { NgModel, NgForm, FormControl } from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { BcertAPIService } from 'src/app/shared/bcert-api.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ScheduleResult } from 'src/app/models/schedule-result.model';
import { Classes } from 'src/app/models/classes.model';

@Component({
  selector: 'app-schedule-live-class',
  templateUrl: './schedule-live-class.component.html',
  styleUrls: ['./schedule-live-class.component.scss'],
  providers: [
    // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},

    // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ]
})
export class ScheduleLiveClassComponent implements OnInit {

  classes : Classes
  response : string[] = []

  // date = new FormControl(moment());

  constructor(public service : BcertAPIService, public datePipe : DatePipe) { }

  ngOnInit(): void {
    this.service.ScheduleLiveClassFormData.reset();
  }

  onClick(){
    
  }

  addEvent(date : any){
    const momentDate = new Date(date); // Replace event.value with your date value
    const formattedDate = moment(momentDate).format("YYYY-MM-DD");
    this.service.ScheduleLiveClassFormData.controls['date'].setValue(formattedDate);
    console.log(formattedDate)
  }

  onSubmit(){
    this.service.scheduleALiveClass(this.service.ScheduleLiveClassFormData).subscribe(result =>{
      console.log(result)
      this.response = []
      for(let data in result){
        this.response.push(result[data])
      }
      this.service.status = this.response[0]
      this.service.classID = this.response[2]
      this.classes={
        ClassID : this.service.classID,
        CourseID : 5,
        Date : this.service.ScheduleLiveClassFormData.controls['date'].value,
        EndTime : this.service.ScheduleLiveClassFormData.controls['end_time'].value,
        StartTime : this.service.ScheduleLiveClassFormData.controls['start_time'].value,
        ClassName : this.service.ScheduleLiveClassFormData.controls['title'].value
      }
      this.service.insertClasses(this.classes)
    })
  }
}
