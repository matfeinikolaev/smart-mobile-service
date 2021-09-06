import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NativeGeocoder } from '@ionic-native/native-geocoder/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { AngularFirestore } from "@angular/fire/firestore";

declare var google;
@Component({
  selector: 'app-location',
  templateUrl: 'location.page.html',
  styleUrls: ['location.page.scss'],
})
export class LocationPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  map: any;
  titleText: string;
  backButtonText: string;
  showCompanyOnMap: boolean = false;
  clickedBussiness: any = false;
  @ViewChild("mapElement") mapElement: ElementRef;
  constructor(
    private navCtrl: NavController, 
    public data: Data, 
    public config: Config, 
    private geolocation: Geolocation, 
    private diagnostic: Diagnostic,
    private nativeGeocoder: NativeGeocoder,
    private angularFirestore: AngularFirestore,
    private platform: Platform,
    ) {}
  ngOnInit() {}
  ionViewDidEnter() {
    this.fetchData();
    this.setStringsToLanguage();
    this.getMapData();
  }
  fetchData() {
    if(!this.data.user.uid) {
      this.data = JSON.parse(window.localStorage.getItem("data"));
    }
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  setStringsToLanguage() {
    switch(this.data.settings.language) {
      case "en": 
        this.titleText = "Locations";
        this.backButtonText = "Back";
        break;
      case "ge":
        this.titleText = "Standorte";
        this.backButtonText = "Zurück";
        break;
      case "ru":
        this.titleText = "Локации";
        this.backButtonText = "Назад";
        break;
      default: 
        this.titleText = "Locations";
        this.backButtonText = "Back";
        break;
    }
  }
  openGoogleMaps() {

  }
  createMap(coords) {
    this.decodeCoords(coords);
    let mapOptions /*: google.maps.MapOptions*/ = {
      center: coords,
      zoom: 14,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      fullscreenControl: false,
      streetViewControl: false,
      mapTypeControl: false,
      clickableIcons: false,
      zoomControl: false,
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    this.placeLocationsOnMap();
  }
  placeLocationsOnMap() {
    this.angularFirestore.collection("companies_locations").get().subscribe(obs => {
      obs.forEach(el => {
        var companyData: any = el.data();
        var coords: any = new google.maps.LatLng(companyData.lat, companyData.lng);
        companyData.googleMapsLink = "http://maps.google.com/maps?daddr=" + companyData.lat + ", " + companyData.lng;
        var marker = new google.maps.Marker({position: coords});
        marker.setMap(this.map);
        marker.addListener("click", e => {
          this.clickedBussiness = companyData;
          this.showCompanyOnMap = true;
          this.map.setCenter(coords);
        });
        this.map.addListener("click", e => {
          this.showCompanyOnMap = false;
          this.clickedBussiness = null;
        });
      });
    });
  }
  decodeCoords(coords) {
    this.nativeGeocoder.reverseGeocode(coords.lat, coords.lng).then(res => {
      this.saveLocationData({countryCode: res[0].countryCode, locality: res[0].locality});
    }, err => console.error(JSON.stringify(err)));
  }
  saveLocationData(location) {
    const ref = this.angularFirestore.collection("users").doc(this.data.user.uid);        
    ref.update({
      location: location
    }).then(() => {
      this.data.user.location = location;
      window.localStorage.setItem("data", JSON.stringify(this.data));
    });
  }
  getMapData() {
    if (this.platform.is("hybrid")) {
      this.diagnostic.isLocationEnabled().then(enabled => {
        if (enabled) {
          this.geolocation.getCurrentPosition().then(res => {
            this.createMap({lat: +res.coords.latitude, lng: +res.coords.longitude});
          }, err => {
            console.error(JSON.stringify(err));
            this.createMap({lat: 49.9935, lng: 36.2304});
          });
        } else {
          this.createMap({lat: 49.9935, lng: 36.2304});
        }
      });
    } else {
      this.createMap({lat: -0.177027, lng: -78.440765});
    }
  }

  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
}
