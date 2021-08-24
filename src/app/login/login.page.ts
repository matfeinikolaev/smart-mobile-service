import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import * as FireBase from 'firebase';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  email: any = "";
  password: string = "";
  errorMessage: string = "";
  displayError: boolean = false;
  emailErrorMessage: any;
  displayEmailError: boolean = false;
  passwordErrorMessage: any;
  displayPasswordError: boolean = false;
  backButtonText: string;
  titleText: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  socialMediaTitle: string;
  loginButtonText: string;
  @ViewChild("emailInput") emailInput;
  @ViewChild("passwordInput") passwordInput;
  constructor(private navCtrl: NavController, public data: Data, private googlePlus: GooglePlus, private angularFireAuth: AngularFireAuth, private angularFirestore: AngularFirestore) {

  }
  ionViewDidEnter() {
    this.setStringsToLanguage();
  }
  ngOnInit() {}
  setStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.titleText = "Login"; 
        this.emailPlaceholder = "Email";
        this.passwordPlaceholder = "Password";
        this.socialMediaTitle = "Or login using social media ";
        this.loginButtonText = "Login";
        this.backButtonText = "Back";
        break;
      case "ge":
        this.titleText = "Anmeldung";
        this.emailPlaceholder = "E-Mail";
        this.passwordPlaceholder = "Passwort";
        this.socialMediaTitle = "Oder loggen Sie sich über soziale Medien ein";
        this.loginButtonText = "Anmelden";
        this.backButtonText = "Zurück";
        break;
      case "ru":
        this.titleText = "Вход";
        this.emailPlaceholder = "Электронная почта";
        this.passwordPlaceholder = "Пароль";
        this.socialMediaTitle = "Или войдите, используя социальные сети";
        this.loginButtonText = "Войти";
        this.backButtonText = "Назад";
        break;
      default: 
        this.titleText = "Login"; 
        this.emailPlaceholder = "Email";
        this.passwordPlaceholder = "Password";
        this.socialMediaTitle = "Or login using social media ";
        this.loginButtonText = " Login";
        this.backButtonText = "Back";
      break;
    }
  }
  typing() {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    var check = re.test(String(this.email).toLowerCase());
    if (!check && this.email != "") {
      this.emailErrorMessage = "Oops this is not a valid email";
      this.displayEmailError = true;
      this.emailInput.el.classList.add("item-with-error");
      this.emailInput.el.firstChild.classList.add("input-with-error");
    } else {
      this.displayEmailError = false;
      this.emailInput.el.classList.remove("item-with-error");
      this.emailInput.el.firstChild.classList.remove("input-with-error");
    }
    if (this.password != "" && this.password.length < 6) {
      this.passwordErrorMessage = "Oops this is not a valid password";
      this.displayPasswordError = true;
      this.passwordInput.el.classList.add("item-with-error");
      this.passwordInput.el.firstChild.classList.add("input-with-error");
    } else {
      this.displayPasswordError = false;
      this.passwordInput.el.classList.remove("item-with-error");
      this.passwordInput.el.firstChild.classList.remove("input-with-error");
    }
  }
  login() {
    this.angularFireAuth.signInWithEmailAndPassword(this.email, this.password).then(res => {
      this.goHome();
    }, err => console.error(err));
  }
  signInWithCredential(credential) {
    return new Promise((resolve, reject) => {
      this.angularFireAuth.signInWithCredential(credential).then(res => {
        resolve(res.additionalUserInfo.profile);
      }, err => {
        reject(err);
      });
    })
  }
  saveData(loginData) {
    var data = {
      email: loginData.email,
      first_name: loginData.given_name,
      last_name: loginData.family_name,
      img: loginData.picture,
      uid: loginData.id,
    };
    const ref = this.angularFirestore.collection("users").doc(loginData.id);
    ref.get().subscribe(obs => {
      if (!obs.exists) {
        ref.set(data);
        this.saveDataToStorageAfterLogin(data);
        this.goHome();
      } else {
        this.saveDataToStorageAfterLogin(obs.data());
        this.goHome();
      }
    });
  }
  saveDataToStorageAfterLogin(data) {
    this.data.user = data;
    this.data.user.isLoggedin = true;
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }
  goHome() {
    this.navCtrl.navigateRoot("home");
  }
  signInWithPopup(provider) {
    this.angularFireAuth.signInWithPopup(provider).then(res => {
      this.saveData(res.additionalUserInfo.profile);
    }, err => {
      console.error(JSON.stringify(err));
    });
  }
  google() {
    // this.signInWithPopup(new FireBase.default.auth.GoogleAuthProvider());
    this.googlePlus.login({ 'webClientId': '111576881427-hvlntstioehjipdlcbc5annh68deopdn.apps.googleusercontent.com' }).then(res => {
      var credential = FireBase.default.auth.GoogleAuthProvider.credential(res.idToken);
      this.signInWithCredential(credential).then(res => {
        this.saveData(res);
      }, err => console.error(err));
    }, err => alert(JSON.stringify(err)));
  }
  apple() {

  }
  facebook() {

  }
  twitter() {

  }
  toggleError(error) {
    this.errorMessage = error;
    this.displayError = true;
  }
}
