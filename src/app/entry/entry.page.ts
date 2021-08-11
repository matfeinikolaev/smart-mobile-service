import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
@Component({
  selector: 'app-entry',
  templateUrl: 'entry.page.html',
  styleUrls: ['entry.page.scss'],
})
export class EntryPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  constructor(private navCtrl: NavController, public data: Data) {

  }
  ngOnInit() {}
  redirect(page) {
    this.navCtrl.navigateForward(page);
  }
}
