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
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
const fbconfig = {
  apiKey: 'AIzaSyB5YkQuxOVIrG2YTDOCE9WqqXnttxFUVjQ',
  authDomain: 'smart-mobile-service-fast.firebaseapp.com',
  databaseURL: 'https://smart-mobile-service-fast-default-rtdb.firebaseio.com/',
  projectId: 'smart-mobile-service-fast',
  messagingSenderId: "111576881427",
  appId: "1:111576881427:android:c823e4f13f9c087dd562e6",
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
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}