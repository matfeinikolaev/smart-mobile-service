import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
@Component({
  selector: 'app-download-report',
  templateUrl: 'download-report.page.html',
  styleUrls: ['download-report.page.scss'],
})
export class DownloadReportPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  titleText: string;
  labelText: string;
  backButtonText: string;
  saveButtonText: string;
  constructor(private navCtrl: NavController, public data: Data, public config: Config) {

  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.fetchData();
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
        this.titleText = "Download report"; 
        this.labelText = "Report"
        this.backButtonText = "Back";
        this.saveButtonText = "Save";
        break;
      case "ge":
        this.titleText = "Bericht herunterladen";
        this.labelText = "Bericht"
        this.backButtonText = "Zurück";
        this.saveButtonText = "Speichern";
        break;
      case "ru":
        this.titleText = "Скачать отчет";
        this.labelText = "Отчет"
        this.backButtonText = "Назад";
        this.saveButtonText = "Сохранить";
        break;
      default: 
        this.titleText = "Download report"; 
        this.labelText = "Report"
        this.backButtonText = "Back";
        this.saveButtonText = "Save";
        break;
    }
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
  save() {
    this.navCtrl.navigateForward("reports");
  }
}
