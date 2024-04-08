import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RouterService {

  constructor() { }

  route = new BehaviorSubject<string>('home');

  setRoute(route: string) {
    this.route.next(route);
  }

}
