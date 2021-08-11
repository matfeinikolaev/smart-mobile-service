import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js';
import { Data } from '../data/data';
@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
})
export class LoginPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  constructor(private navCtrl: NavController, public data: Data) {

  }
  ngOnInit() {}
  next() {
    this.navCtrl.navigateForward("home");
    // this.supabase.auth.signUp({
    //   email: this.email,
    //   password: this.password,
    // }).then(res => {
    //   console.log(res);
    //   if (res.data == null || res.user == null) {
    //     this.toggleError(res.error.message);
    //   }
    // }, err => console.error(err));
  }
  toggleError(error) {
    this.errorMessage = error;
    this.displayError = true;
  }
}
