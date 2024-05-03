import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }


  baseUrl = "https://replicagiftsbackend.onrender.com"
  // baseUrl = "http://localhost:3000"

  totalSales_amt() {
    return this.http.get(this.baseUrl + '/api/chart/total_sales');
  }

  today_sale() {
    return this.http.get(this.baseUrl + '/api/chart/today_sale');
  }

  monthly_sale() {
    return this.http.get(this.baseUrl + '/api/chart/monthly_sale');
  }


  sales_chart(option: any) {
    return this.http.get(this.baseUrl + '/api/chart/chart_data', { params: option });
  }

  recent_order() {
    return this.http.get(this.baseUrl + '/api/chart/recent_orders');
  }

  outofstockGift() {
    return this.http.get(this.baseUrl + '/api/chart/gifts');

  }


}
