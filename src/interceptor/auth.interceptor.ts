import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import { App, ToastController } from 'ionic-angular';
import { HttpStatusCode } from '../shared/HttpStatusCode';
import { NGXLogger } from 'ngx-logger';

// We should rename this interceptor to AuthInterceptor
// @Lalit: Resolved
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  private logger: NGXLogger;
// Http interceptor is powerful object, the API is concise so read every word with attention.
// https://angular.io/api/common/http/HttpInterceptor

  // Is this constructor empty for a reason or is it just WIP?
  /*@Lalit: This constructor is used to inject App and AuthService dependency it is called 'Constructor Injection'. We can also use this
    for initialization in future*/
  // https://angular.io/guide/dependency-injection-pattern
  constructor(private app: App, private toastCtrl: ToastController, private injector: Injector) {
  }

  // This is where the fun happens :)
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let cloneRequest = req.clone();
    this.logger = this.injector.get(NGXLogger);
    // Is local storage injected in this interceptor or is it a global variable.
    // @Lalit: localStorage is a global varibale
    // We should be careful about using global variables.
    let authenticationToken = localStorage.getItem('token');
    // If we are going to clone the req anyways, why not keep it out of the following condition statement and clone it as we initialize the variable.
    // @Lalit: Resolved
    if (authenticationToken !== null) {
      // clone method also facilitates us to add the param in request
      cloneRequest = cloneRequest.clone({
        // I don't understand following line. Are we seeting the token in orignal req object ? asking because you told me we should not edit req object.
        // Reply: No we are adding token in the cloned HttpRequest object because original req object (req) is immutable
        headers: req.headers.set('Bearer', authenticationToken).append('Content-Type', 'application/json')
      });
    }


    // The code we are writing is nice and compact but hard to debug for old school person like me.

    // We should call the next.handle and get the return object in a variable.
    // Then see what is the content on it.
    // as per the api of handle method, httpevent is returned and it is observable
    // Discussion: If we assigning next.handle into an onject so we have to subscribe it and  it makes api calls twice, for better understanding please refer below link
    // https://stackoverflow.com/questions/45664874/interceptor-making-two-calls-in-api

    // What do we really want to do with it ?
    // https://medium.com/@benlesh/learning-observable-by-building-observable-d5da57405d87


    // I see that we are calling, next.handle.
    // I also know that handle method returns HttpEvent
    // What is the role of "do" ?
    // http://reactivex.io/documentation/operators/do.html
    // http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do

    return next.handle(cloneRequest).do((event: HttpEvent<any>) => {},
      (err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === HttpStatusCode.UNAUTHORIZED) {
          localStorage.removeItem('token');
          this.logger.info('Token cleared successfully ');
          // Store failed request and component name in session storgae
          sessionStorage.setItem('_PREVIOUS_REQUEST_', JSON.stringify(cloneRequest));
          sessionStorage.setItem('_PREVIOUS_SCREEN_', this.app.getActiveNavs().pop().getActive().name);
          this.logger.info('Request cached successfully');

          // Redirect user to login screen
          this.app.getRootNav().push('LoginPage');
        }
        if (err.status === HttpStatusCode.CONNECTION_ERROR) {
          let toast = this.toastCtrl.create({
            // TODO: It should be internationalized
            message: 'Connection Error',
            duration: 3000
          });
          toast.present();
        }
      }
    });
    // What is being returned from this function?
    // @Lalit: Returns a mirrored Observable of the source Observable, but modified so that the provided Observer is called to perform a side effect for every value, error, and completion emitted by the source. Any errors that are thrown in the aforementioned Observer or handlers are safely sent down the error path of the output Observable.
    // Reference: http://reactivex.io/rxjs/class/es6/Observable.js~Observable.html#instance-method-do

  }
}
