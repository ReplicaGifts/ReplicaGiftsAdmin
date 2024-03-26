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


    return this.http.post<any>("http://localhost:3000/api/frame/viewed/" + id, {}, _options)
  }

  getAllFrames() {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}` }) };


    return this.http.get<any>("http://localhost:3000/api/frame/orders", _options)
  }

  checkNoOfOrder() {
    this.getAllFrames().subscribe((frames: any) => {
      this.noOfOrder.next(frames.recentlyAdded.length)
    })
  }

  updateStauts(id: any, status: any) {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.put<any>(`http://localhost:3000/api/frame/${id}/delivery-status`, { status }, _options)
  }
  updatetrackingId(id: any, trackingId: any) {
    const token: string | null = sessionStorage.getItem('admin');
    let _options = { headers: new HttpHeaders({ 'Authorization': `Bearer ${token ? JSON.parse(token).token : ""}`, 'Content-Type': 'application/json' }) };


    return this.http.put<any>(`http://localhost:3000/api/frame/${id}/tracking-id`, { trackingId }, _options)
  }

}
