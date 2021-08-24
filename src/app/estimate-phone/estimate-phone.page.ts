import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';

@Component({
  selector: 'app-estimate-phone',
  templateUrl: 'estimate-phone.page.html',
  styleUrls: ['estimate-phone.page.scss'],
})
export class EstimatePhonePage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  getReport: boolean = false;
  displayGetEstimating: boolean = false;
  backButtonText: string;
  titleText: string;
  estimatePhoneButtonText: string;
  analysisUsingButtonText: string;
  getEstimatingButtonText: string;
  phoneAgeText: string;
  defectText: string;
  batteryWearText: string;
  estimateButtonText: string;
  reportText: string;
  constructor(private navCtrl: NavController, public data: Data, public config: Config, public batteryStatus: BatteryStatus) {

  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.fetchData();
    const subscription = this.batteryStatus.onChange().subscribe(status => {
      console.log(JSON.stringify(status));
      console.log(status.level, status.isPlugged);
    });

    // stop watch
    subscription.unsubscribe();
    this.setStringsToLanguage();
  }
  fetchData() {
    if(!this.data.user.uid) {
      this.data = JSON.parse(window.localStorage.getItem("data"));
    }
  }
  setStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.titleText = "Estimate a phone"; 
        this.backButtonText = "Back";
        this.estimatePhoneButtonText = "Estimate a phone";
        this.analysisUsingButtonText = "Analysis Using";
        this.getEstimatingButtonText = "Get estimating";
        this.reportText = "Report";
        this.phoneAgeText = "Phone age";
        this.defectText = "Defect";
        this.batteryWearText = "Battery wear";
        this.estimateButtonText = "Estimate";
        break;
      case "ge":
        this.titleText = "Ein Telefon schätzen";
        this.backButtonText = "Zurück";
        this.estimatePhoneButtonText = "Ein Telefon schätzen";
        this.analysisUsingButtonText = "Analyse mit";
        this.getEstimatingButtonText = "Schätzung abrufen";
        this.reportText = "Bericht";
        this.phoneAgeText = "Telefonalter";
        this.defectText = "Defekt";
        this.batteryWearText = "Batterieverschleiß";
        this.estimateButtonText = "Schätzung";
        break;
      case "ru":
        this.titleText = "Оценить телефон";
        this.backButtonText = "Назад";
        this.estimatePhoneButtonText = "Оценить телефон";
        this.analysisUsingButtonText = "Анализ использования";
        this.getEstimatingButtonText = "Получить оценку";
        this.reportText = "Отчет";
        this.phoneAgeText = "Возраст телефона";
        this.defectText = "Дефект";
        this.batteryWearText = "Износ батареи";
        this.estimateButtonText = "Измерить";
        break;
      default: 
        this.titleText = "Estimate a phone"; 
        this.backButtonText = "Back";
        this.estimatePhoneButtonText = "Estimate a phone";
        this.analysisUsingButtonText = "Analysis Using";
        this.getEstimatingButtonText = "Get estimating";
        this.reportText = "Report";
        this.phoneAgeText = "Phone age";
        this.defectText = "Defect";
        this.batteryWearText = "Battery wear";
        this.estimateButtonText = "Estimate";
      break;
    }
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
  estimatePhone() {
    this.getReport = true;
  }
  openGetEstimating() {
    this.displayGetEstimating = !this.displayGetEstimating;
  }
}
