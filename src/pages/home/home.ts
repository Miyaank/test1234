import { Component, ViewChild } from '@angular/core';
import {IonicPage, Nav, NavController, PopoverController} from 'ionic-angular';
import {PopoverPage} from "../popover/popover";

@IonicPage({name: 'HomePage'})
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  constructor(private navCtrl: NavController, private popOverCtrl: PopoverController) {
  }

  getUserProfile() {
    this.navCtrl.push('UserProfilePage');
  }

  presentPopover(event) {
    let popover = this.popOverCtrl.create(PopoverPage);
    popover.present({
      ev: event
    });
  }

  ngOnInit() {
  }


}
