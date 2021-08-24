import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.page.html',
  styleUrls: ['profile.page.scss'],
})
export class ProfilePage {
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  backButtonText: string;
  titleText: string;
  firstNameLabelText: string;
  lastNameLabelText: string;
  phoneNumberLabelText: string;
  emailLabelText: string;
  phoneModelLabelText: string;
  reportsHistoryButtonText: string;
  estimatePhoneButtonText: string;
  settingsButtonText: string;
  locationsButtonText: string;
  signOutButtonText: string;
  saveButtonText: string;
  constructor(private navCtrl: NavController, public data: Data, public config: Config, private imagePicker: ImagePicker, private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {

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
        this.titleText = "Edit profile"; 
        this.firstNameLabelText = "First name";
        this.lastNameLabelText = "Last name";
        this.phoneNumberLabelText = "Phone number";
        this.emailLabelText = "Email";
        this.phoneModelLabelText = "Phone model";
        this.reportsHistoryButtonText = "Reports history";
        this.backButtonText = "Back";
        this.estimatePhoneButtonText = "Estimate a phone";
        this.settingsButtonText = "Settings";
        this.locationsButtonText = "Locations";
        this.signOutButtonText = "Sign out";
        this.saveButtonText = "Save";
        break;
      case "ge":
        this.titleText = "Profil bearbeiten";
        this.firstNameLabelText = "Vorname";
        this.lastNameLabelText = "Nachname";
        this.phoneNumberLabelText = "Telefonnummer";
        this.emailLabelText = "E-Mail";
        this.phoneModelLabelText = "Telefonmodell";
        this.reportsHistoryButtonText = "Berichtsverlauf";
        this.backButtonText = "Zurück";
        this.estimatePhoneButtonText = "Schätzen Sie ein Telefon";
        this.settingsButtonText = "Einstellungen";
        this.locationsButtonText = "Standorte";
        this.signOutButtonText = "Austragen";
        this.saveButtonText = "Speichern";
        break;
      case "ru":
        this.titleText = "Редактировать профиль";
        this.firstNameLabelText = "Имя";
        this.lastNameLabelText = "Фамилия";
        this.phoneNumberLabelText = "Номер телефона";
        this.emailLabelText = "Электронная почта";
        this.phoneModelLabelText = "Модель телефона";
        this.reportsHistoryButtonText = "История отчетов";
        this.backButtonText = "Назад";
        this.estimatePhoneButtonText = "Оценить телефон";
        this.settingsButtonText = "Настройки";
        this.locationsButtonText = "Локации";
        this.signOutButtonText = "Выйти";
        this.saveButtonText = "Сохранить";
        break;
      default: 
        this.titleText = "Edit profile"; 
        this.firstNameLabelText = "First name";
        this.lastNameLabelText = "Last name";
        this.phoneNumberLabelText = "Phone number";
        this.emailLabelText = "Email";
        this.phoneModelLabelText = "Phone model";
        this.reportsHistoryButtonText = "Reports history";
        this.backButtonText = "Back";
        this.estimatePhoneButtonText = "Estimate a phone";
        this.settingsButtonText = "Settings";
        this.locationsButtonText = "Locations";
        this.signOutButtonText = "Sign out";
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
    const ref = this.angularFirestore.collection("users").doc(this.data.user.uid);
    ref.set(this.data.user);
    ref.get().subscribe(obs => {
      this.saveDataToStorage(obs.data());
    });
  }
  saveDataToStorage(data) {
    this.data.user = data;
    this.data.user.isLoggedin = true;
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }
  uploadPhoto() {
    let options= {
      maximumImagesCount: 1,
    }
    this.imagePicker.getPictures(options).then((results) => {
      alert(JSON.stringify(results));
      for (var i = 0; i < results.length; i++) {
        alert('Image URI: ' + results[i]);
      }
    }, (err) => alert("Error: " + JSON.stringify(err)));
  }
  signOut() {
    this.angularFireAuth.signOut().then(res => {
      this.navCtrl.navigateRoot("entry");
    })
  }
}