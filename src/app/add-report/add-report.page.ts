import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { ExtendedDeviceInformation } from '@ionic-native/extended-device-information/ngx';
import { Device } from '@ionic-native/device/ngx';
import { HttpClient } from '@angular/common/http';
import { AngularFirestore } from "@angular/fire/firestore";
// declare var cordova: any;
@Component({
  selector: 'app-add-report',
  templateUrl: 'add-report.page.html',
  styleUrls: ['add-report.page.scss'],
})
export class AddReportPage {
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  memory: any;
  serial: any;
  titleText: string;
  modelLabelText: string;
  volumeMemoryLabelText: string;
  defectLabelText: string;
  serialNumberLabelText: string;
  otherDefectLabelText: string;
  payButtonText: string;
  backButtonText: string;
  compareWith : any;
  allDefectsList: any = {};
  chosenDeviceDefects: any = [];
  constructor(
    private navCtrl: NavController, 
    public data: Data, 
    public config: Config, 
    private device: Device, 
    private extendedDeviceInformation: ExtendedDeviceInformation,
    private httpClient: HttpClient,
    private angularFirestore: AngularFirestore,
    ) {
    // this.data.mobileData.volumeMemory = cordova.plugins['extended-device-information'].memory;
    this.data.mobileData.serialNumber = this.device.serial;
    this.data.mobileData.phoneModel = this.device.model;
  }
  ngOnInit() {
    this.httpClient.get("../../assets/pricelist.json").subscribe(obs => {
      this.allDefectsList = obs;
    });
    this.compareWith = this.compareWithFn;
  }
  setDefect() {
    this.chosenDeviceDefects = this.allDefectsList[this.data.mobileData.phoneModel][this.data.settings.language];
  }
  ionViewDidEnter() {
    this.fetchData();
    this.setStringsToLanguage();
  }

  fetchData() {
    this.data = JSON.parse(window.localStorage.getItem("data"));
    this.angularFirestore.collection("users").doc(this.data.user.uid).ref.get().then(res => {
      this.data.user = res.data();
    })
  }
  compareWithFn(o1, o2) {
    return true;
  }
  setStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.titleText = "Mobile data"; 
        this.modelLabelText = "Model";
        this.volumeMemoryLabelText = "Volume memory";
        this.defectLabelText = "Defect";
        this.serialNumberLabelText = "Serial number";
        this.otherDefectLabelText = "Other defect";
        this.payButtonText = "Pay";
        this.backButtonText = "Back";
        break;
      case "ge":
        this.titleText = "Mobile Daten";
        this.modelLabelText = "Modell";
        this.volumeMemoryLabelText = "Volumenspeicher";
        this.defectLabelText = "Defekt";
        this.serialNumberLabelText = "Seriennummer";
        this.otherDefectLabelText = "Anderer Defekt";
        this.payButtonText = "Bezahlen";
        this.backButtonText = "Zurück";
        break;
      case "ru":
        this.titleText = "Мобильные данные";
        this.modelLabelText = "Модель";
        this.volumeMemoryLabelText = "Объем памяти";
        this.defectLabelText = "Дефект";
        this.serialNumberLabelText = "Серийный номер";
        this.otherDefectLabelText = "Другой дефект";
        this.payButtonText = "Оплатить";
        this.backButtonText = "Назад";
        break;
      default: 
        this.titleText = "Mobile data"; 
        this.modelLabelText = "Model";
        this.volumeMemoryLabelText = "Volume memory";
        this.defectLabelText = "Defect";
        this.serialNumberLabelText = "Serial number";
        this.otherDefectLabelText = "Other defect";
        this.payButtonText = "Pay";
        this.backButtonText = "Back";
      break;
    }
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    window.localStorage.setItem("data", JSON.stringify(this.data));
    this.navCtrl.navigateForward(page, {animated: false});
  }
}
