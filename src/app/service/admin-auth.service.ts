import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthService {

  constructor(private http: HttpClient, private router: Router) { }

  noOfCantact = new BehaviorSubject<number>(0);

  baseUrl = "https://replicagiftsbackend.onrender.com"
  // baseUrl = "http://localhost:3000"

  _options = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  reg(user: any) {
    return this.http.post(this.baseUrl + '/api/admin/signup', user, this._options)
  }
  login(user: any) {
    return this.http.post(this.baseUrl + '/api/admin/login', user, this._options)
  }
  getUser() {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };
    return this.http.get(this.baseUrl + '/api/admin/me', _options);
  }

  private isAuthenticatedValue: boolean = false;


  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('admin');
    this.isAuthenticatedValue = !!token;
    return this.isAuthenticatedValue;
  }

  logOut() {
    sessionStorage.removeItem('admin');
    this.isAuthenticatedValue = false;
    this.router.navigate(['/']);
  }

  conatct() {
    return this.http.get(this.baseUrl + "/api/admin/contact")
  }

  delete(id: string) {
    return this.http.delete(this.baseUrl + "/api/admin/contact/" + id);
  }

  viewedConatct(id: any) {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post(this.baseUrl + "/api/admin/viewed/" + id, {}, _options)
  }


  checkNoOf() {

    this.http.get<any>(this.baseUrl + "/api/admin/notify").subscribe(data => {
      this.noOfCantact.next(data.count);
    })

  }

}
