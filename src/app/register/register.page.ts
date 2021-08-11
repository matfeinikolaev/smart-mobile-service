import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js'

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
})
export class RegisterPage {
  supabase: any;
  email: any;
  password: any;
  errorMessage: any;
  displayError: boolean = false;
  constructor(public navCtrl: NavController) {

  }
  ngOnInit() {
    this.supabase = createClient("https://wunpwnfbwnanyimuyjpd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODEwNTExMywiZXhwIjoxOTQzNjgxMTEzfQ.BkpN6jVR2S8DnbZ4Qj5LLIkkPR0rDVs4V9m9VxTD_yI");
    console.log(this.supabase);
  }
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
