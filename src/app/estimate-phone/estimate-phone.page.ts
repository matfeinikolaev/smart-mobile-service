import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
@Component({
  selector: 'app-estimate-phone',
  templateUrl: 'estimate-phone.page.html',
  styleUrls: ['estimate-phone.page.scss'],
})
export class EstimatePhonePage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  getReport: boolean = false;
  displayGetEstimating: boolean = false;
  constructor(private navCtrl: NavController, public data: Data, public config: Config) {

  }
  ngOnInit() {}
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
  estimatePhone() {
    this.getReport = true;
  }
  openGetEstimating() {
    this.displayGetEstimating = !this.displayGetEstimating;
  }
}
