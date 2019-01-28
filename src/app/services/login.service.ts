import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

interface LoginResponse {
  loginResponse: {
    signature: string;
    JSESSIONID: string;
    routing_id: string;
    nonce: string;
    cons_id: string;
    timestamp: string;
    token: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  loginOptions = new HttpParams()
    .set('method', 'login')
    .set('api_key', 'API KEY')
    .set('user_name', 'USERNAME')
    .set('password', 'PASSWORD')
    .set('response_format', 'json')
    .set('v', '1.0');

  constructor(private http: HttpClient) {}

  login() {
    console.log(this.loginOptions.toString());

    return this.http
      .post<LoginResponse>(
        // tslint:disable-next-line:max-line-length
        `https://actnow.tofighthiv.org/site/CRConsAPI?${this.loginOptions.toString()}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        }
      )
      .pipe(map(x => x.loginResponse.token));
  }
}
