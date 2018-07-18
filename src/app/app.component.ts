import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';
import {LoginPage} from "../pages/login/login";
import {HomePage} from "../pages/home/home";
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = 'LoginPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private translate: TranslateService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.localizeApplication();
      if(localStorage.getItem('token')) {
        this.rootPage = HomePage;
      } else {
        this.rootPage = LoginPage;
      }

    });
  }
  // This function is used to localize/internationalize the app
  localizeApplication() {
    let browserLanguage = this.translate.getBrowserLang();
    if (browserLanguage) {
      this.translate.setDefaultLang(browserLanguage);
    }
    else {
      this.translate.use('en');
    }
 }
}

