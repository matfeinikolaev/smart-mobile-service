import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { AngularFireStorage } from "@angular/fire/storage";
import * as Firebase from "firebase";
import { Crop } from '@ionic-native/crop/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';

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
  photos: any;
  imageresult: any;
  imageIndex: any = 0;
  imageArray: any = [];
  constructor(
    private navCtrl: NavController, 
    public data: Data,
    public config: Config,
    private imagePicker: ImagePicker,
    private angularFireAuth: AngularFireAuth,
    private angularFirestore: AngularFirestore,
    private angularFireStorage: AngularFireStorage,
    private crop: Crop,
    private webview: WebView,
    ) {

  }
  ngOnInit() {}
  ionViewDidEnter() {
    // this.uploadImgToFirebaseStorage("file:///data/user/0/eu.smartmobileservice.app/cache/tmp_IMG-20210902-WA0006345847542.jpg");
    this.fetchData();
    this.setStringsToLanguage();
  }

  fetchData() {
    this.data = JSON.parse(window.localStorage.getItem("data"));
    this.angularFirestore.collection("users").doc(this.data.user.uid).ref.get().then(res => {
      this.data.user = res.data();
    })
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
    ref.set(this.data.user).then(() => {
      ref.get().subscribe(obs => {
        this.saveDataToStorage(obs.data());
      });
    });
  }
  saveDataToStorage(data) {
    this.data.user = data;
    this.data.user.isLoggedin = true;
    window.localStorage.setItem("data", JSON.stringify(this.data));
  }

  uploadPhoto() {
    this.openImagePicker();
  }

  openImagePicker() {
    this.imagePicker.hasReadPermission()
    .then(result => {
      if (result === false) {
        this.imagePicker.requestReadPermission();
      }
      else if (result === true) {
        this.imagePicker.getPictures({
          // the amout of images that the user can select
          maximumImagesCount: 1
        }).then(results => {
          for (var i = 0; i < results.length; i++) {
            this.crop.crop(results[i], {quality: 75}).then(
              newImage => {
                this.uploadImageToFirebase(newImage);
              },
              error => console.error("Error cropping image", error)
            );
          }
        }, err => console.log(err));
      }
    }, err => console.log(err));
  }
  uploadImageToFirebase(image) {
    image = this.webview.convertFileSrc(image);
  
    // uploads image to firebase storage
    this.uploadImage(image).then(photoURL => {
      this.saveImgToDB(photoURL);
      console.log(JSON.stringify(photoURL));
    });
  }
  saveImgToDB(url) {
    this.data.user.img = url;
    this.save();
  }
  uploadImage(imageURI) {
    return new Promise<any>((resolve, reject) => {
      let storageRef = Firebase.default.storage().ref();
      let imageRef = storageRef.child('users').child(this.data.user.uid);
      this.encodeImageUri(imageURI, (image64) => {
        imageRef.putString(image64, 'data_url').then(snapshot => {
          resolve(snapshot.ref.getDownloadURL());
        }, err => {
          reject(err);
        })
      })
    })
  }

  encodeImageUri(imageUri, callback) {
    var c = document.createElement('canvas');
    var ctx = c.getContext("2d");
    var img = new Image();
    img.onload = function () {
      var aux:any = this;
      c.width = aux.width;
      c.height = aux.height;
      ctx.drawImage(img, 0, 0);
      var dataURL = c.toDataURL("image/jpeg");
      callback(dataURL);
    };
    img.src = imageUri;
  };

  signOut() {
    this.angularFireAuth.signOut().then(res => {
      this.data.user.isLoggedin = false;
      window.localStorage.setItem("data", JSON.stringify(this.data));
      this.navCtrl.navigateRoot("entry");
    })
  }
}
