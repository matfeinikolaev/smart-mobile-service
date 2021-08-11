import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
import { Config } from '@ionic/angular';
@Component({
  selector: 'app-add-report',
  templateUrl: 'add-report.page.html',
  styleUrls: ['add-report.page.scss'],
})
export class AddReportPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  constructor(private navCtrl: NavController, public data: Data, public config: Config) {

  }
  ngOnInit() {}
  ionViewDidLeave() {
    this.config.set('animated', false);
  }
  redirect(page) {
    this.navCtrl.navigateForward(page, {animated: false});
  }
}
