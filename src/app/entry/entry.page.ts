import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
@Component({
  selector: 'app-entry',
  templateUrl: 'entry.page.html',
  styleUrls: ['entry.page.scss'],
})
export class EntryPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  titleText: string;
  loginButtonText: string;
  registerButtonText: string;
  constructor(private navCtrl: NavController, public data: Data) {

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
        this.titleText = "Smart Mobile Service"; 
        this.loginButtonText = "Login";
        this.registerButtonText = "Register";
        break;
      case "ge":
        this.titleText = "Smart Mobile Service";
        this.loginButtonText = "Anmelden";
        this.registerButtonText = "Registrieren";
        break;
      case "ru":
        this.titleText = "Smart Mobile Service";
        this.loginButtonText = "Войти";
        this.registerButtonText = "Зарегистрироваться";
        break;
      default: 
        this.titleText = "Smart Mobile Service"; 
        this.loginButtonText = "Login";
        this.registerButtonText = "Register";
      break;
    }
  }
  redirect(page) {
    this.navCtrl.navigateForward(page);
  }
}
