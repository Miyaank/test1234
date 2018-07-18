import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { LoginModel } from '../../models/login.model';
import { WidgetUtils } from '../../shared/widget.util';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { HcService } from '../../providers/hc.provider';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs/Subscription';
import { NGXLogger} from 'ngx-logger';


@IonicPage({name: 'LoginPage'})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  companyLogo: string;
  loginServiceSubscription: Subscription;
  constructor(private navCtrl: NavController, private dialog: WidgetUtils, private hcService: HcService, private translate: TranslateService, private logger: NGXLogger) {
    this.companyLogo =  'assets/imgs/hc.png';
    this.loginServiceSubscription = new Subscription();
  }

  login(username, password) {
    if (localStorage.getItem('baseUrl') === null) {
      this.dialog.showToast(this.translate.instant('tenantUrlRequired'));
    }
    else {
      this.dialog.showLoading('Loading');
      this.loginServiceSubscription.add(this.hcService.login(localStorage.getItem('baseUrl'), username, password)
        .subscribe((data: HttpResponse<LoginModel>) => {
            localStorage.setItem('token', data.body.token);
            let httpRequest = JSON.parse(sessionStorage.getItem('_PREVIOUS_REQUEST_'));
            if (httpRequest !== null) {
              this.hcService.processRequest(httpRequest).subscribe(
                (data: any) => {
                  let targetScreen = sessionStorage.getItem('_PREVIOUS_SCREEN_');
                  this.dialog.hideLoading();
                  this.navCtrl.push(targetScreen, { data });
                  sessionStorage.removeItem('_PREVIOUS_REQUEST_');
                  sessionStorage.removeItem('_PREVIOUS_SCREEN_');
                },
                (err: HttpErrorResponse) => {
                  this.dialog.hideLoading();
                  this.dialog.showToast(err.message);
                });
            }
            else {
              this.logger.info('No Cached request to fire ');
              this.dialog.hideLoading();
              this.navCtrl.setRoot('HomePage');
            }
        },
          (err) => {
            this.dialog.hideLoading();
            this.logger.error(err);
            if (err.error.hasOwnProperty('_ERROR_MESSAGE_')) {
              this.dialog.showToast(err.error._ERROR_MESSAGE_);
            }
          }
        ));
    }
  }

  showPrompt() {
    this.dialog.showPrompt();
  }

  ionViewWillUnload() {
    this.loginServiceSubscription.unsubscribe();
  }

}
