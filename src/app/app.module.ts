import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen   } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { WidgetUtils } from '../shared/widget.util';
import { HcService } from '../providers/hc.provider';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../interceptor/auth.interceptor';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LoginPageModule } from '../pages/login/login.module';
import { LoginPage } from '../pages/login/login';
import { PopoverPage } from '../pages/popover/popover';
import { PopoverPageModule } from '../pages/popover/popover.module';
import { LoggerModule, NGXLogger, NgxLoggerLevel } from 'ngx-logger';
import { Geolocation } from "@ionic-native/geolocation";
import {HomePage} from "../pages/home/home";
import {HomePageModule} from "../pages/home/home.module";


@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    LoginPageModule,
    PopoverPageModule,
    HomePageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    LoggerModule.forRoot({serverLoggingUrl: '/api/logs', level: NgxLoggerLevel.DEBUG, serverLogLevel: NgxLoggerLevel.ERROR})

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    HomePage,
    PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HcService,
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    WidgetUtils,
    Geolocation,
    NGXLogger
  ]
})
export class AppModule {
}
export function createTranslateLoader(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}


