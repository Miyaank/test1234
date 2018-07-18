import {AlertController, Loading, LoadingController, ToastController} from "ionic-angular";
import {Injectable} from "@angular/core";
import {TranslateService} from "@ngx-translate/core";

@Injectable()
export class WidgetUtils {
  loader: Loading;
  constructor(private loadingCtrl: LoadingController, private toastCtrl: ToastController, private alertCtrl: AlertController, private translate: TranslateService) {

  }

  showLoading(message) {
    this.loader = this.loadingCtrl.create({
      content: message
    });
    this.loader.present();
  }

  hideLoading() {
    this.loader.dismiss();
  }

  showToast(message) {
    let toast = this.toastCtrl.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  showPrompt() {
    // Internationalisation is table feature of enterprise sdk. Cannot move forward without it.
    // @Lalit: Resolved
    let prompt = this.alertCtrl.create({
      title: this.translate.instant('promptTitle'),
      message: this.translate.instant('promptMessage'),
      inputs: [
        {
          name: this.translate.instant('url'),
          placeholder: this.translate.instant('promptTitle'),
          value : localStorage.getItem('baseUrl')
        },
      ],
      buttons: [
        {
          text: this.translate.instant('cancel'),
          handler: data => {
          }
        },
        {
          text: this.translate.instant('save'),
          handler: data => {
           if (data.url !== '') {
               localStorage.setItem('baseUrl', data.url);
           }
           else {
             this.showToast('Please Enter Application URL');
           }
          }
        }
      ]
    });
    prompt.present();

  }
}
