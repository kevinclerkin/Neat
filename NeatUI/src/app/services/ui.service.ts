import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiService {
  private showAddBooking: boolean = false;
  private subject = new Subject<any>();

  constructor() { }

  toggleAddBooking(): void{
    this.showAddBooking = !this.showAddBooking;
    this.subject.next(this.showAddBooking);

  }

  onToggle(): Observable<any>{
    return this.subject.asObservable();

  }
}
