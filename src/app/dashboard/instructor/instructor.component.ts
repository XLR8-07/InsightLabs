import { Component, OnInit } from '@angular/core';
import { MatDialogConfig, MatDialog } from '@angular/material/dialog';
import { ScheduleLiveClassComponent } from 'src/app/pop-up-forms/schedule-live-class/schedule-live-class.component';
import { JoinRoomComponent } from 'src/app/pop-up-forms/join-room/join-room.component';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  constructor(public dialog : MatDialog) { }

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
}
