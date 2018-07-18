import { NgModule } from '@angular/core';
import {IonicPage, IonicPageModule} from 'ionic-angular';
import { HomePage } from './home';
import {TranslateModule} from "@ngx-translate/core";

@IonicPage({name:'HomePage'})
@NgModule({
  declarations: [
    HomePage,
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    TranslateModule
  ],
})
export class HomePageModule {}
