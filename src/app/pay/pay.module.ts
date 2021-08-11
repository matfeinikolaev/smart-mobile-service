import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PayPage } from './pay.page';

import { PayPageRoutingModule } from './pay-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PayPageRoutingModule
  ],
  declarations: [PayPage]
})
export class PayPageModule {}
