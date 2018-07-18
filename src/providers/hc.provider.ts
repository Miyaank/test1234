import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class HcService {

  // I don't understant the logic here. Why will be break the domain name in so many parts.
  // We don't have rule that all clients will be subdomain of hotwax.co
  // Reply: Ans -> It is just WIP
  private baseUrlPrefix = 'https://';
  private baseUrlSuffix = '/api/';
  private url: string;

  constructor(private http: HttpClient) {
  }

  // Rename this method to login()
  // @lalit: Resolved
  login (url: string, username: string, password: string): any {
      url = this.baseUrlPrefix + url + this.baseUrlSuffix;
    return this.http.post(url + 'getAuthenticationToken', {},
      {params: new HttpParams().set('USERNAME', username).append('PASSWORD', password),
        observe: 'response'});
  }

  // Rename this method to logout()
  // @lalit: Resolved
  // @deepak.dixit We should have logout endpoint for apps.
  // @anilsir: Sir in case of jjwt we do not have option to expire jjwt token, in this case we need to write code
  // to blacklist generated token until its expiration time.
  logout () {
      // Do we want to inform the server? Why not tell the server that that the token is invalid now.
      // @Lalit: Yes, we should inform to server. Till now there isn't any service for expiring token at server
      // @Lalit: Added for testing only
    localStorage.removeItem('token');
    sessionStorage.clear();

  }

  // rename to processRequest(request)
  // @lalit
  // @lalit: Resolved
  processRequest (request): any {
      // I am not convinced with this respnsibility assignment.
      // If this code is responsible for continuing user on their journer after login, it should be part of the invercepter.\
    /*@Lalit: This code is only for firing cached http request as this file is used for firing http request, I thik this code should be here
    we have done the responsibilty assignment in the login.ts which decides what will be the next screen  */
    // @Lalit: Why we are using login.ts for responsibility assignment?
    /* @Lalit: As we have only a single entry point for login in our SDK so we should decide our next action after login using this single entry point
      whether it should be  normal flow or interrupt one*/
    // We should keep our Interceptor generic, responsible only for attaching headers and checking authentication
    let body: any = request.body;
    let url: any = request.url;
    let parmas: any = request.params;
    // TODO: We should use 'request' method instead of 'GET' or 'POST'. At present we are getting some internal error in http.js method ((method.toUpperCase))
    return this.http.post(url, body, parmas);


  }

  updateUserPassword(url: string, currentPassword: string, newPassword: string, newPasswordVerify: string) {
    url = this.baseUrlPrefix + url + this.baseUrlSuffix;
     return this.http.post(url + 'updateUserPassword', {},
      {params: new HttpParams().set('currentPassword', currentPassword).append('newPassword', newPassword).append('newPasswordVerify', newPasswordVerify),
        observe: 'response'});
  }

  userProfile(url): any {
    url = this.baseUrlPrefix + url + this.baseUrlSuffix;
    return this.http.get(url + 'user-profile');
  }
}
