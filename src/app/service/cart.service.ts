import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../model/product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private http: HttpClient) { }

  noOfOrder = new BehaviorSubject<number>(0);


  // baseUrl = "https://replicagiftsbackend.onrender.com"
  baseUrl = "https://replicagiftsbackend.onrender.com"

  addFrame(frameDeatails: any, gifts: any, id: any) {
    const formData = new FormData();

    formData.append('quantity', frameDeatails.quantity);
    formData.append('printType', frameDeatails.printType);
    formData.append('userImage', frameDeatails.userImage);
    formData.append('size', frameDeatails.size);
    formData.append('product', id);


    formData.append('gifts', JSON.stringify(gifts));

    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post("https://replicagiftsbackend.onrender.com/api/frame/add-frame", formData, _options)

  }

  getFrame(id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get<any>("https://replicagiftsbackend.onrender.com/api/frame/get/" + id, _options)
  }
  frameData(id: any) {
    const token: string | null = localStorage.getItem('user');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get<any>("https://replicagiftsbackend.onrender.com/api/frame/get-frame/" + id, _options)
  }

  setFrameViewed(id: any) {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post<any>(this.baseUrl + "/api/frame/viewed/" + id, {}, _options)
  }

  getAllFrames() {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get<any>(this.baseUrl + "/api/frame/orders", _options)
  }

  isNotified(id: string) {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.post(this.baseUrl + "/api/frame/notified/" + id, {}, _options);

  }

  checkNoOf() {

    this.http.get<any>(this.baseUrl + "/api/frame/notify").subscribe(data => {
      this.noOfOrder.next(data.count);
    })
  }
  updateStauts(id: any, status: any) {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.put<any>(this.baseUrl + `/api/frame/${id}/delivery-status`, { status }, _options)
  }
  updatetrackingId(id: any, trackingId: any) {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.put<any>(this.baseUrl + `/api/frame/${id}/tracking-id`, { trackingId }, _options)
  }

}
