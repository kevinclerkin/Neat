import { Component, OnInit } from '@angular/core';
import { UiService } from 'src/app/services/ui.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title: string = 'Neat';
  showAddBooking: boolean = false;
  subscription!: Subscription;

  constructor(private uiService: UiService){
    this.subscription = this.uiService.onToggle().subscribe((value:any) => (this.showAddBooking = value));

  }
  

  ngOnInit(): void {}

  toggleAddBooking(){
    this.uiService.toggleAddBooking();
  }

}
