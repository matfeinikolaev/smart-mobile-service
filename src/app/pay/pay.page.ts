import { Component, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { AngularFirestore } from "@angular/fire/firestore";
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';

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
  currentYear: any;
  maximumYear: any;
  @ViewChild("cardButton") cardButton;
  @ViewChild("paypalButton") paypalButton;
  @ViewChild("number1") number1;
  @ViewChild("number2") number2;
  @ViewChild("number3") number3;
  @ViewChild("number4") number4;
  constructor(
    private navCtrl: NavController, 
    public data: Data, 
    public config: Config, 
    private angularFirestore: AngularFirestore,
    private payPal: PayPal,
    private stripe: Stripe,
    ) {}
  ngOnInit() {
    this.currentYear = (new Date()).getFullYear();
    this.maximumYear = this.currentYear + 100;
  }
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
    method ? this.choosePaypal() : this.chooseCard();
  }
  chooseCard() {
    this.paymentType = "card";
    this.paypalButton.el.classList.remove("active");
    this.cardButton.el.classList.add("active");
  }
  choosePaypal() {
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
  paypal() {
    this.payPal.init({
      PayPalEnvironmentProduction: 'YOUR_PRODUCTION_CLIENT_ID',
      PayPalEnvironmentSandbox: 'YOUR_SANDBOX_CLIENT_ID'
    }).then(() => {

      // Environments: PayPalEnvironmentNoNetwork, PayPalEnvironmentSandbox, PayPalEnvironmentProduction
      this.payPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // Only needed if you get an "Internal Service Error" after PayPal login!
        //payPalShippingAddressOption: 2 // PayPalShippingAddressOptionPayPal
      })).then(() => {
        let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        this.payPal.renderSinglePaymentUI(payment).then(() => {
          // Successfully paid
    
          this.goToReport();
          // Example sandbox response
          //
          // {
          //   "client": {
          //     "environment": "sandbox",
          //     "product_name": "PayPal iOS SDK",
          //     "paypal_sdk_version": "2.16.0",
          //     "platform": "iOS"
          //   },
          //   "response_type": "payment",
          //   "response": {
          //     "id": "PAY-1AB23456CD789012EF34GHIJ",
          //     "state": "approved",
          //     "create_time": "2016-10-03T13:33:33Z",
          //     "intent": "sale"
          //   }
          // }
        }, () => {
          // Error or render dialog closed without being successful
        });
      }, () => {
        // Error in configuration
      });
    }, () => {
      // Error in initialization, maybe PayPal isn't supported or something else
    });
  }
  card() {
    this.stripe.setPublishableKey('my_publishable_key');

    let card = {
      number: '4242424242424242',
      expMonth: 12,
      expYear: 2020,
      cvc: '220'
    }

    this.stripe.createCardToken(card)
      .then(token => {
        console.log(token.id);
        this.goToReport();
      }).catch(error => console.error(error));

  }
  continue() {
    this.goToReport();
    if (this.paymentType == "card" && !this.displayCard) {
      this.displayCard = true;
    } else if (this.paymentType == "paypal" && !this.displayCard) {
      this.paypal();
    } else if (this.displayCard) {
      this.card();
    }
  }
  goToReport() {
    this.navCtrl.navigateRoot("download-report");
  }
}