import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { createClient } from '@supabase/supabase-js'

@Component({
  selector: 'app-get-started',
  templateUrl: 'get-started.page.html',
  styleUrls: ['get-started.page.scss'],
})
export class GetStartedPage {
  supabase: any;
  constructor(private navCtrl: NavController) {

  }
  ngOnInit() {
    this.supabase = createClient("https://wunpwnfbwnanyimuyjpd.supabase.co", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyODEwNTExMywiZXhwIjoxOTQzNjgxMTEzfQ.BkpN6jVR2S8DnbZ4Qj5LLIkkPR0rDVs4V9m9VxTD_yI");
    console.log(this.supabase);
  }
  getStarted() {
    this.navCtrl.navigateRoot("entry");
  }
}
