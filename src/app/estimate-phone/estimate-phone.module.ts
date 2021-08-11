import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EstimatePhonePage } from './estimate-phone.page';

import { EstimatePhonePageRoutingModule } from './estimate-phone-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstimatePhonePageRoutingModule
  ],
  declarations: [EstimatePhonePage]
})
export class EstimatePhonePageModule {}
