import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, ViewController} from 'ionic-angular';
import { HcService } from '../../providers/hc.provider';

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {

  constructor(private navCtrl: NavController, private viewCtrl: ViewController, private hcService: HcService,
              public alertCtrl: AlertController) {
  }

  getUserProfile() {
    this.viewCtrl.dismiss();
    this.navCtrl.push('UserProfilePage');
  }

  performUserLogout() {
    const logoutAlert = this.alertCtrl.create({
      title: 'Logout',
      subTitle: 'Are you sure you want to Logout',
      buttons: [{
        text: 'No',
        role: 'cancel',
        handler: data => {
          this.viewCtrl.dismiss();
        }
      }, {
        text: 'Yes',
        handler: data => {
          logoutAlert.present();
          this.viewCtrl.dismiss();
          this.hcService.logout();
          //TODO: It should be replaced with setRoot
          this.navCtrl.push('LoginPage');
        }
      }]
    });
    logoutAlert.present();
  }
}
