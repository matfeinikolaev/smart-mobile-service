import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
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
  @ViewChild("mapElement") mapElement: ElementRef;
  constructor(private navCtrl: NavController, public data: Data, public config: Config) {

  }
  ngOnInit() {}
  ionViewDidEnter() {
    this.createMap();
  }
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  
  createMap() {
    var coords = {lat: -0.1740226, lng: -78.4953144};
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

  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
}
