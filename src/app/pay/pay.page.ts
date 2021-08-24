import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-pay',
  templateUrl: 'pay.page.html',
  styleUrls: ['pay.page.scss'],
})
export class PayPage {
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  cardNumber: any = [
    "", "", "", ""
  ];
  paymentType: any;
  displayCard: boolean = false;
  backButtonText: string;
  titleText: string;
  selectMethodText: string;
  creditCardText: string;
  paypalText: string;
  addCardText: string;
  continueButtonText: string;
  backToMethodsText: string;
  @ViewChild("cardButton") cardButton;
  @ViewChild("paypalButton") paypalButton;
  @ViewChild("number1") number1;
  @ViewChild("number2") number2;
  @ViewChild("number3") number3;
  @ViewChild("number4") number4;
  constructor(private navCtrl: NavController, public data: Data, public config: Config, private angularFirestore: AngularFirestore) {}
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
        this.titleText = "Pay";   
        this.selectMethodText = "Select your preffered payment method";
        this.creditCardText = "Credit card";
        this.paypalText = "PayPal";
        this.addCardText = "Add card";
        this.continueButtonText = "Continue";
        this.backButtonText = "Back";
        this.backToMethodsText = "Back to payment methods";
        break;
      case "ge":
        this.titleText = "Bezahlen";
        this.selectMethodText = "Wählen Sie Ihre bevorzugte Zahlungsmethode";
        this.creditCardText = "Kreditkarte";
        this.paypalText = "PayPal";
        this.addCardText = "Karte hinzufügen";
        this.continueButtonText = "Weiter";
        this.backButtonText = "Zurück";
        this.backToMethodsText = "Zurück zu Zahlungsmethoden";
        break;
      case "ru":
        this.titleText = "Оплатить";
        this.selectMethodText = "Выберите предпочитаемый способ оплаты";
        this.creditCardText = "Кредитная карта";
        this.paypalText = "PayPal";
        this.addCardText = "Добавить карту";
        this.continueButtonText = "Продолжить";
        this.backButtonText = "Назад";
        this.backToMethodsText = "Вернуться к способам оплаты";
        break;
      default: 
        this.titleText = "Pay";   
        this.selectMethodText = "Select your preffered payment method";
        this.creditCardText = "Credit card";
        this.paypalText = "PayPal";
        this.addCardText = "Add card";
        this.continueButtonText = "Continue";
        this.backButtonText = "Back";
        this.backToMethodsText = "Back to payment methods";
      break;
    }
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  cardNumberEntered(part, number = null) {
    if (this.cardNumber[part].length == "4") {
      if (number != null) {
        number.setFocus();
      }
    }
  }
  choosePaymentMethod(method) {
    method ? this.paypal() : this.card();
  }
  card() {
    this.paymentType = "card";
    this.paypalButton.el.classList.remove("active");
    this.cardButton.el.classList.add("active");
  }
  paypal() {
    this.paymentType = "paypal";
    this.cardButton.el.classList.remove("active");
    this.paypalButton.el.classList.add("active");
  }
  backToPaymentMethods() {
    this.displayCard = false;
    this.paymentType = "";
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
  continue() {
    if (this.paymentType == "card" && !this.displayCard) {
      this.displayCard = true;
    } else if (this.paymentType == "paypal" && !this.displayCard) {

    } else if (this.displayCard) {
      this.data.mobileData.defect = JSON.stringify(this.data.mobileData.defect);
      const ref = this.angularFirestore.collection("users").doc(this.data.user.uid);
      var newData = {...this.data.user, ...{devices: [this.data.mobileData]}};
      ref.set(newData).then(() => this.goToReport());
    }
  }
  goToReport() {
    this.navCtrl.navigateRoot("download-report");
  }
}