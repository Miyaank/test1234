import { Component } from '@angular/core';
import { AlertController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { WidgetUtils } from '../../shared/widget.util';
import { TranslateService } from '@ngx-translate/core';
import { HcService } from '../../providers/hc.provider';
import { LoginPage } from '../login/login';
import { UserProfile } from '../../models/user.profile';
import { Subscription } from 'rxjs/Subscription';
import { Geolocation } from '@ionic-native/geolocation';


@IonicPage({name: 'UserProfilePage'})
@Component({
  selector: 'page-userprofile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {
  private profileImage = '../../assets/imgs/user_image.png';
  private userDataSubscription: Subscription;
  private navParamsData: any = {};
  private deviceLocation: any;
  private userProfileDetail: UserProfile;
  private timeZone: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private widget: WidgetUtils, private translate: TranslateService, private alertCtrl: AlertController, private hcService: HcService, private geolocation: Geolocation) {
    this.navParamsData = navParams.get('data');
    this.userDataSubscription = new Subscription();
    this.userProfileDetail = {partyName: 'NA', partyId: 'NA', email: 'NA', address: {address1: 'NA', toName: 'NA',
        attnName: 'NA',
        address2: 'NA',
        houseNumber: 'NA',
        houseNumberExt: 'NA',
        directions: 'NA',
        city: 'NA',
        cityGeoId: 'NA',
        postalCode: 0,
        postalCodeExt: 'NA',
        countryGeoId: 'NA',
        stateProvinceGeoId: 'NA',
        countyGeoId: 'NA',
        municipalityGeoId: 'NA',
        geoPointId: 'NA',
        postalCodeGeoId: 'NA'
      }, contact: 'NA', userLoginId: 'NA'};
    this.deviceLocation = {latitude: 'NA',longitude: 'NA'};
    this.timeZone = 'NA';
  }

  ionViewWillEnter() {
    if (this.navParamsData) {
      this.userProfileDetail = this.navParamsData;
    }
    else {
      this.getUserProfile();
    }
    this.timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(this.timeZone);
    this.getCurrentLocation();
  }

  getUserProfile() {
    this.userDataSubscription.add(this.hcService.userProfile(localStorage.getItem('baseUrl')).subscribe((data: UserProfile) => {
      this.userProfileDetail = data;
    }));
  }

  updatePassword() {
    let prompt = this.alertCtrl.create({
      title: this.translate.instant('Update Password'),
      message: 'Enter following details to update password',
      inputs: [
        {
          name: 'currentPassword',
          placeholder: 'current password',
        },
        {
          name: 'newPassword',
          placeholder: 'new password',
        },
        {
          name: 'verifyPassword',
          placeholder: 'verify new password'

        }
      ],
      buttons: [
        {
          text: this.translate.instant('cancel')
        },
        {
          text: this.translate.instant('save'),
          handler: data => {
            if (data.currentPassword !== '' || data.newPassword !== '' || data.verifyPassword !== '') {
              if (data.newPassword === data.verifyPassword) {
                this.widget.showLoading('Loading');
                this.userDataSubscription.add(this.hcService.updateUserPassword(localStorage.getItem('baseUrl'), data.currentPassword,
                  data.newPassword, data.verifyPassword).subscribe((response: any) => {
                    this.widget.hideLoading();
                    this.widget.showToast(response.body._EVENT_MESSAGE_);
                  },
                  (err) => {
                    this.widget.hideLoading();
                    this.widget.showToast(err.status);
                  }));
              }
              else {
                this.widget.showToast(this.translate.instant('passwordDoesNotMatch'));
              }
            }
            else {
              this.widget.showToast(this.translate.instant('AllFieldsRequired'));
            }

          }
        }
      ]
    });
    prompt.present();
  }

  logout() {
    this.hcService.logout();
    this.navCtrl.setRoot('LoginPage');
  }
  // Unsubscribe to the subscribed observables. It can prevent memory leak problems
  ionViewWillUnload() {
    this.userDataSubscription.unsubscribe();
  }

  getCurrentLocation() {
    this.geolocation.getCurrentPosition().then(response => {
        this.deviceLocation.latitude = response.coords.latitude;
        console.log(response);
      },
      error => {
        console.log('Geopoint rejected');
      }).catch(error => {
      console.log(error);
    })
  }
}

