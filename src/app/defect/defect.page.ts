import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { AngularFirestore } from "@angular/fire/firestore";
@Component({
  selector: 'app-defect',
  templateUrl: 'defect.page.html',
  styleUrls: ['defect.page.scss'],
})
export class DefectPage {
  defect: string = "";
  backButtonText: string;
  titleText: string;
  textAreaLabelText: string;
  placeholderText: string;
  saveButtonText: string;
  constructor(private navCtrl: NavController, public data: Data, public config: Config, private angularFirestore: AngularFirestore) {}
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
        this.titleText = "Defect"; 
        this.textAreaLabelText = "Please, describe your  phone’s defect";
        this.placeholderText = "Text...";
        this.backButtonText = "Back";
        this.saveButtonText = "Save";
        break;
      case "ge":
        this.titleText = "Defekt";
        this.textAreaLabelText = "Bitte beschreiben Sie den Defekt Ihres Telefons";
        this.placeholderText = "Text...";
        this.backButtonText = "Zurück";
        this.saveButtonText = "Speichern";
        break;
      case "ru":
        this.titleText = "Дефект";
        this.textAreaLabelText = "Опишите неисправность вашего телефона";
        this.placeholderText = "Текст ...";
        this.backButtonText = "Назад";
        this.saveButtonText = "Сохранить";
        break;
      default: 
        this.titleText = "Defect"; 
        this.textAreaLabelText = "Please, describe your  phone’s defect";
        this.placeholderText = "Text...";
        this.backButtonText = "Back";
        this.saveButtonText = "Save";
        break;
    }
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  save() {
    const ref = this.angularFirestore.collection("users").doc(this.data.user.uid);
    ref.get().subscribe(obs => {
      var data: any = obs.data();
      var defects = [];
      if (!data.defects) {
        defects = [this.defect];
      } else {
        defects = data.defects;
        defects.push(this.defect);
      }
      var newData = {...this.data.user, ...{defects: defects}};
      ref.set(newData).then(() => this.navCtrl.navigateBack("add-report", {animated: false}));
      ref.get().subscribe(obs => {
        this.saveDataToStorage(obs.data());
      });
    });
  }
  saveDataToStorage(data) {
    this.data.user = data;
    console.log(this.data);
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
}
