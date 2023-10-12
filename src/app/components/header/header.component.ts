import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  title: string = 'Neat';
  showAddTask: boolean = false;
  

  ngOnInit(): void {}

  toggleAddBooking(){
    console.log("Toggle")
  }

}
