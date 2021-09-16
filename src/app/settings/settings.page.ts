import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
declare var FCM;
@Component({
  selector: 'app-settings',
  templateUrl: 'settings.page.html',
  styleUrls: ['settings.page.scss'],
})
export class SettingsPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  displayLanguageList: boolean = false;
  english: string;
  german: string;
  russian: string;
  languageString: string;
  notificationsString: string;
  deleteReportsString: string;
  settingsString: string;
  backButtonText: string;
  @ViewChild("openLanguageListButton") openLanguageListButton;
  constructor(
    private navCtrl: NavController, 
    public data: Data, 
    public config: Config,
    ) {
  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.fetchData();
    this.changeStringsToLanguage();
  }
  fetchData() {
    this.data = JSON.parse(window.localStorage.getItem("data"));
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
  changeLanguage(lang) {
    this.data.settings.language = lang;
    this.saveDataToStorage(this.data);
    this.changeStringsToLanguage();
  }
  saveDataToStorage(data) {
    this.data = data;
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }
  switchNotifications() {
    FCM.getToken().then(token => {
      alert(JSON.stringify(token));
    }, err => {
      alert(JSON.stringify(err));
    });
  }
  openLanguageList() {
    this.displayLanguageList = !this.displayLanguageList;
    this.openLanguageListButton.el.classList.contains("opened") ? this.openLanguageListButton.el.classList.remove("opened") : this.openLanguageListButton.el.classList.add("opened");
  }
  changeStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.english = "English"; 
        this.german = "German";
        this.russian = "Russian";
        this.languageString = "Language";
        this.notificationsString = "Notifications";
        this.deleteReportsString = "Delete reports";
        this.settingsString = "Settings";
        this.backButtonText = "Back";
        break;
      case "ge":
        this.english = "Englisch"; 
        this.german = "Deutsch";
        this.russian = "Russisch";
        this.languageString = "Sprache";
        this.notificationsString = "Benachrichtigungen";
        this.deleteReportsString = "Berichte löschen";
        this.settingsString = "Einstellungen";
        this.backButtonText = "Zurück";
        break;
      case "ru":
        this.english = "Английский"; 
        this.german = "Немецкий";
        this.russian = "Русский";
        this.languageString = "Язык";
        this.notificationsString = "Оповещения";
        this.deleteReportsString = "Удалить отчеты";
        this.settingsString = "Настройки";
        this.backButtonText = "Назад";
        break;
      default: 
        this.english = "English"; 
        this.german = "German";
        this.russian = "Russian";
        this.languageString = "Language";
        this.notificationsString = "Notifications";
        this.deleteReportsString = "Delete reports";
        this.settingsString = "Settings";
        this.backButtonText = "Back";
      break;
    }
  }
}
