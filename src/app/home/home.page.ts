import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { Admob, AdmobOptions } from '@ionic-native/admob';
import { AngularFirestore } from "@angular/fire/firestore";


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
  constructor(
    private navCtrl: NavController, 
    public data: Data, 
    public config: Config,
    private angularFirestore: AngularFirestore,
    ) {}
  ngOnInit() {
    Admob.createBannerView().then(res => {
      alert(JSON.stringify(res));
    }, err => alert(JSON.stringify(err)));
  }
  ionViewDidEnter() {
    this.fetchData();
    this.setStringsToLanguage();
  }
  fetchData() {
    this.data = JSON.parse(window.localStorage.getItem("data"));
    this.angularFirestore.collection("users").doc(this.data.user.uid).ref.get().then(res => {
      this.data.user = res.data();
      window.localStorage.setItem("data", JSON.stringify(this.data));
    })
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
