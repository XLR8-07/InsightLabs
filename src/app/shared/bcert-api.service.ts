import { Injectable } from '@angular/core';
import { ScheduleLiveClass } from '../models/schedule-live-class.model';
import {FormGroup, FormControl} from "@angular/forms";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EyeSonJoinRoom } from '../models/eye-son-join-room.model';

@Injectable({
  providedIn: 'root'
})
export class BcertAPIService {

  readonly APIkey : string = 'hGcJnrk8JgypGJr3fgxe';
  readonly BaseURL : string = 'https://api.braincert.com';

  readonly EyesonAPI : string = 'gbmixsw7BLXVE9717xgZc6n7E6wbAyOyGhMpBGODCB';
  readonly EyesonURL : string = 'https://api.eyeson.team/';

  ScheduleLiveClassFormData : ScheduleLiveClass;
  EyeSonJoinRoomFormData : EyeSonJoinRoom;

  constructor(public http : HttpClient) { }

  scheduleALiveClass(formData : ScheduleLiveClass){
    return this.http.post(this.BaseURL+'/v2/schedule?apikey='+this.APIkey,formData);
  }

  JoinRoomEyeson(formData : string){
    let headers = new HttpHeaders({
      'Authorization': this.EyesonAPI });
    let options = { headers: headers };
    console.log(formData)
    return this.http.post(this.EyesonURL+'/rooms?user[name]='+formData,null,options);
  }
}
