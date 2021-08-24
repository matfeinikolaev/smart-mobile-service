import { Injectable, OnInit } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class Data {
    user: any = {};
    mobileData: any = {
      phoneModel: "",
      volumeMemory: "",
      defect: "",
      serialNumber: "",
    };
    settings: any = {
      language: "en",
      notifications: "n",
    }
}