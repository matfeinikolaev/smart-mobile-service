import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
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
  @ViewChild("mapElement") mapElement: ElementRef;
  constructor(private navCtrl: NavController, public data: Data, public config: Config, private geolocation: Geolocation, private diagnostic: Diagnostic) {

  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.fetchData();
    this.setStringsToLanguage();
    this.createMap();
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
  createMap() {
    this.diagnostic.isLocationEnabled().then(enabled => {
      if (enabled) {
        this.geolocation.getCurrentPosition().then(res => {
          var lat = res.coords.latitude;
          var lng = res.coords.longitude;
          var coords = {lat: +lat, lng: +lng};
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
        }, err => {
          console.log(JSON.stringify(err));
          var lat = 49.9935;
          var lng = 36.2304;
          var coords = {lat: +lat, lng: +lng};
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
        });
      } else {
        var lat = 49.9935;
        var lng = 36.2304;
        var coords = {lat: +lat, lng: +lng};
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
      }
    });
  }

  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
}
