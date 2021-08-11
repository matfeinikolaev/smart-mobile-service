import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AddReportPage } from './add-report.page';

import { AddReportPageRoutingModule } from './add-report-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddReportPageRoutingModule
  ],
  declarations: [AddReportPage]
})
export class AddReportPageModule {}
