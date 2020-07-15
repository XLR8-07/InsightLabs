import { Component, OnInit } from '@angular/core';
import { BcertAPIService } from 'src/app/shared/bcert-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-join-room',
  templateUrl: './join-room.component.html',
  styleUrls: ['./join-room.component.scss']
})
export class JoinRoomComponent implements OnInit {

  response : string[] = []

  constructor(public service : BcertAPIService) { }

  ngOnInit(): void {
    this.resetForm()
  }

  onSubmit(form){
    console.log(this.service.EyeSonJoinRoomFormData.userName)
    this.service.JoinRoomEyeson(this.service.EyeSonJoinRoomFormData.userName).subscribe(result =>{
      for(let data in result){
        this.response.push(result[data])
      }
      console.log(this.response[6]["gui"])
      window.open (this.response[6]["gui"]);
      this.resetForm(form);
    })
  }

  resetForm(form? : NgForm){
    if(form != null)
      form.resetForm();
    this.service.EyeSonJoinRoomFormData={
      userName : ''
    }
 }
}
