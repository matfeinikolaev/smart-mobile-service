import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { DefectPage } from './defect.page';

import { DefectPageRoutingModule } from './defect-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DefectPageRoutingModule
  ],
  declarations: [DefectPage]
})
export class DefectPageModule {}
