import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { EntryPage } from './entry.page';

import { EntryPageRoutingModule } from './entry-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntryPageRoutingModule
  ],
  declarations: [EntryPage]
})
export class EntryPageModule {}
