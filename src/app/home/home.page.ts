import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  backButtonText: string;
  titleText: string;
  costEstimateButtonText: string;
  constructor(private navCtrl: NavController, public data: Data, public config: Config) {

  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.fetchData();
    this.setStringsToLanguage();
  }
  fetchData() {
    this.data = JSON.parse(window.localStorage.getItem("data"));
  }
  setStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.titleText = "Welcome";
        this.backButtonText = "Back";
        this.costEstimateButtonText = "Cost Estimate";
        break;
      case "ge":
        this.titleText = "Willkommen";
        this.backButtonText = "Zurück";
        this.costEstimateButtonText = "Kostenschätzung";
        break;
      case "ru":
        this.titleText = "Добро пожаловать";
        this.backButtonText = "Назад";
        this.costEstimateButtonText = "Оценка стоимости";
        break;
      default: 
        this.titleText = "Welcome";
        this.backButtonText = "Back";
        this.costEstimateButtonText = "Cost Estimate";
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
