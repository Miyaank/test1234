import { HttpClient } from '@angular/common/http';
export declare class HcService {
    private http;
    private baseUrlPrefix;
    private baseUrlSuffix;
    private loginServiceRoute;
    constructor(http: HttpClient);
    doLogin(url: string, username: string, password: string): any;
    doLogout(): void;
}
