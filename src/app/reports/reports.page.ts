import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
@Component({
  selector: 'app-reports',
  templateUrl: 'reports.page.html',
  styleUrls: ['reports.page.scss'],
})
export class ReportsPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  backButtonText: string;
  titleText: string;
  downloadButtonText: string;
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
        this.titleText = "Reports history"; 
        this.downloadButtonText = "Download";
        this.backButtonText = "Back";
        break;
      case "ge":
        this.titleText = "Berichtsverlauf";
        this.downloadButtonText = "Herunterladen";
        this.backButtonText = "Zurück";
        break;
      case "ru":
        this.titleText = "История отчетов";
        this.downloadButtonText = "Загрузить";
        this.backButtonText = "Назад";
        break;
      default: 
        this.titleText = "Reports history"; 
        this.downloadButtonText = "Download";
        this.backButtonText = "Back";
        break;
    }
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
}
