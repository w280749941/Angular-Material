import {Inject, Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import { User } from '../domain';
import { Auth } from '../domain/auth.model';


@Injectable()
export class AuthService {
  private headers = new Headers({
    'Content-Type': 'application/json'
  });

  private token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
    '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9' +
    '.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ';


  constructor(private http: Http,
              @Inject('BASE_CONFIG') private config) {
  }


  register(user: User): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get(uri, {params: {'email': user.email}})
      .switchMap(res => {
        if (res.json().length > 0) {
          throw new Error('username existed');
        }
        return this.http.post(uri, JSON.stringify(user), {headers: this.headers})
          .map(r => ({token: this.token, user: r.json()}));
      });
  }


  login(email: string, password: string): Observable<Auth> {
    const uri = `${this.config.uri}/users`;
    return this.http
      .get(uri, {params: {'email': email, 'password': password}})
      .map(res => {
        if (res.json().length === 0) {
          throw new Error('Login Failed');
        }
        return {
          token: this.token,
          user: res.json()[0]
        };
      });
  }
}
