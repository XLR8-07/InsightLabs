import { Injectable } from '@angular/core';
import { ScheduleLiveClass } from '../models/schedule-live-class.model';
import {FormGroup, FormControl} from "@angular/forms";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { EyeSonJoinRoom } from '../models/eye-son-join-room.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { Classes } from '../models/classes.model';
import { Users } from '../models/users.model';
import { Courses } from '../models/courses.model';

@Injectable({
  providedIn: 'root'
})
export class BcertAPIService {

  readonly APIkey : string = 'hGcJnrk8JgypGJr3fgxe';
  readonly BaseURL : string = 'https://api.braincert.com';

  readonly EyesonAPI : string = 'gbmixsw7BLXVE9717xgZc6n7E6wbAyOyGhMpBGODCB';
  readonly EyesonURL : string = 'https://api.eyeson.team/';

  classID : string;
  status : string;
  users : Users[];
  courses : Courses[];
  Available : number = 0;

  ScheduleLiveClassFormData : FormGroup = new FormGroup({
    title : new FormControl(''),
    timezone : new FormControl(12),
    start_time : new FormControl(''),
    end_time : new FormControl(''),
    date : new FormControl('')
  });
  EyeSonJoinRoomFormData : EyeSonJoinRoom;

  constructor(public http : HttpClient, public firestore : AngularFirestore) { }

  scheduleALiveClass(formdata : FormGroup){  
    var title = formdata.controls['title'].value
    var timezone = formdata.controls['timezone'].value
    var start_time = formdata.controls['start_time'].value
    var end_time =formdata.controls['end_time'].value
    var date = formdata.controls['date'].value

    console.log(title,timezone,start_time,end_time,date)
    var url = this.BaseURL+'/v2/schedule?apikey='+this.APIkey+'&title='+title+'&timezone='+timezone+'&start_time='+start_time+'&end_time='+end_time+'&date='+date
    return this.http.post(url,formdata.value)

    // return this.http.post(this.BaseURL+'/v2/schedule?apikey='+this.APIkey,{
    //   params:  params });
  }

  insertClasses(cls : Classes){
    this.firestore.collection('Classes').add(cls).then(()=>{
      console.log('cls Handaisi');
      this.ScheduleLiveClassFormData.reset();
      this.classID = '';
    });
  }

  JoinRoomEyeson(formData : string){
    let headers = new HttpHeaders({
      'Authorization': this.EyesonAPI });
    let options = { headers: headers };
    console.log(formData)
    return this.http.post(this.EyesonURL+'/rooms?user[name]='+formData,null,options);
  }

  getClassLaunchURL(classID,userID,isTeacher){
    var url = this.BaseURL+'/v2/getclasslaunch?apikey='+this.APIkey+'&class_id='+classID+'&userId='+userID+'&userName=Insight&isTeacher='+isTeacher+'&lessonName=BCERT&courseName=API'
    return this.http.post(url,this.ScheduleLiveClassFormData.value)
  }

  getUsers(){
    return this.firestore.collection('Users').snapshotChanges().subscribe(actionarray =>{
      this.users = actionarray.map(item4 =>{
        return {
          id : item4.payload.doc.id,
          ...item4.payload.doc.data() as Users
        } as Users;
      })
      console.log(this.users)
    });
  }

  getCourses(){
    return this.firestore.collection('Courses').snapshotChanges().subscribe(actionarray =>{
      this.courses = actionarray.map(item4 =>{
        return {
          id : item4.payload.doc.id,
          ...item4.payload.doc.data() as Courses
        } as Courses;
      })
      console.log(this.courses)
      this.Available = 2;
    });
  }
}
