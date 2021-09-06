import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ImagePicker } from '@ionic-native/image-picker/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { ExtendedDeviceInformation } from '@ionic-native/extended-device-information/ngx';
import { Device } from '@ionic-native/device/ngx';
import { BatteryStatus } from '@ionic-native/battery-status/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook } from '@ionic-native/facebook/ngx';
import { TwitterConnect } from '@ionic-native/twitter-connect/ngx';
import { SignInWithApple } from '@ionic-native/sign-in-with-apple/ngx';
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { PayPal } from '@ionic-native/paypal/ngx';
import { Stripe } from '@ionic-native/stripe/ngx';
import { Admob } from '@ionic-native/admob';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

const fbconfig = {
  apiKey: 'AIzaSyB5YkQuxOVIrG2YTDOCE9WqqXnttxFUVjQ',
  authDomain: 'smart-mobile-service-fast.firebaseapp.com',
  databaseURL: 'https://smart-mobile-service-fast-default-rtdb.firebaseio.com/',
  projectId: 'smart-mobile-service-fast',
  messagingSenderId: "111576881427",
  appId: "1:111576881427:android:c823e4f13f9c087dd562e6",
  storageBucket: 'gs://smart-mobile-service-fast.appspot.com',
};
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    AngularFireModule.initializeApp(fbconfig),
    AngularFirestoreModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    ImagePicker,
    Geolocation,
    Diagnostic,
    ExtendedDeviceInformation,
    Device,
    BatteryStatus,
    GooglePlus,
    Facebook,
    TwitterConnect,
    SignInWithApple,
    NativeGeocoder,
    File,
    FileOpener,
    Crop,
    HttpClient,
    PayPal,
    Stripe,
    WebView,
    InAppBrowser,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
