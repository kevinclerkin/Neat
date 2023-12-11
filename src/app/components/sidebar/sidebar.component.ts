import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {
  @Input() mode: 'over' | 'side' = 'side';
  isSidebarOpen = true;
  username: string | null = null;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    const rawUsername = this.auth.getfullNameFromToken();
    this.username = rawUsername ? rawUsername.toUpperCase() : null;
    console.log(this.username);
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  logout(){
    this.auth.signOut();
  }

 
}
