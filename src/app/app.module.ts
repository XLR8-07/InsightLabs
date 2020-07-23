import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StudentComponent } from './dashboard/student/student.component';
import { InstructorComponent } from './dashboard/instructor/instructor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { BcertAPIService } from './shared/bcert-api.service';
import {MatDialogModule} from '@angular/material/dialog';
import { PopUpFormsComponent } from './pop-up-forms/pop-up-forms.component';
import {ScheduleLiveClassComponent} from './pop-up-forms/schedule-live-class/schedule-live-class.component';
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { JoinRoomComponent } from './pop-up-forms/join-room/join-room.component';
import { DatePipe } from '@angular/common';
import {CdkTableModule} from '@angular/cdk/table';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import * as moment from 'moment';
import { environment } from 'src/environments/environment';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    StudentComponent,
    InstructorComponent,
    PopUpFormsComponent,
    ScheduleLiveClassComponent,
    JoinRoomComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    HttpClientModule,
    ReactiveFormsModule,
    CdkTableModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule
  ],
  providers: [BcertAPIService,DatePipe],
  bootstrap: [AppComponent],
  entryComponents : [ScheduleLiveClassComponent,JoinRoomComponent]
})
export class AppModule { }
