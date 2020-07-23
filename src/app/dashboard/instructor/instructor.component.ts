import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ScheduleLiveClassComponent } from 'src/app/pop-up-forms/schedule-live-class/schedule-live-class.component';
import { JoinRoomComponent } from 'src/app/pop-up-forms/join-room/join-room.component';
import { BcertAPIService } from 'src/app/shared/bcert-api.service';
import { Users } from 'src/app/models/users.model';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  classLaunchResponseT : string[] =[]
  classLaunchResponseS : string[] =[]
  TempUser : number = 1
  activeUser : Users

  constructor(public dialog : MatDialog, public service : BcertAPIService) { }

  ngOnInit(): void {
  }
  ScheduleClass(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "50%";
    this.dialog.open(ScheduleLiveClassComponent,dialogconfig);
  }

  JoinRoom(){
    const dialogconfig = new MatDialogConfig();
    dialogconfig.disableClose = false;
    dialogconfig.autoFocus = true;
    dialogconfig.width = "50%";
    this.dialog.open(JoinRoomComponent,dialogconfig);
  }

  EnterRoomT(){
    if(this.service.status == "ok"){
      this.service.getClassLaunchURL(this.service.classID, 11, 1).subscribe(result =>{
        for(let data in result){
          this.classLaunchResponseT.push(result[data])
        }
        console.log("Teacher", this.classLaunchResponseT[3]);
        window.open (this.classLaunchResponseT[3]);
      })
    }
  }

  EnterRoomS(){
    if(this.service.status == "ok"){
      this.service.getClassLaunchURL(this.service.classID, 13, 0).subscribe(result =>{
        for(let data in result){
          this.classLaunchResponseS.push(result[data])
        }
        console.log("Student", this.classLaunchResponseS[3]);
        // window.open (this.classLaunchResponseS[3]);
      })
    }
  }

  ChangeUser(){
    if(this.TempUser == 1){
      this.activeUser = this.service.users[0]
      this.TempUser = 2
      console.log("Active user is : ", this.activeUser.Name)
    }
    else{
      this.activeUser = this.service.users[1]
      this.TempUser = 1
      console.log("Active user is : ", this.activeUser.Name)
    }
  }
}
