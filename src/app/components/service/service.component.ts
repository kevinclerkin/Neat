import { Component, OnInit } from '@angular/core';
import { ServiceOption } from '../../models/service-option';
import { NeatService } from '../../services/neat-service.service';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {
  services!: ServiceOption[];

  constructor(private service: NeatService) { }

  ngOnInit(): void {
    this.service.getServices().subscribe((services)=> {
      this.services = services;
    })}

  editService(service: ServiceOption) {}
  
  deleteService(service: ServiceOption){};
  
  }