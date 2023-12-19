import { Component, OnInit } from '@angular/core';
import { ServiceOption } from '../../models/service-option';
import { NeatService } from '../../services/neat-service.service';
import { MatDialog } from '@angular/material/dialog';
import { AddServiceDialogComponent } from '../add-service-dialog/add-service-dialog.component';
import { EditServiceDialogComponent } from '../edit-service-dialog/edit-service-dialog.component';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrl: './service.component.css'
})
export class ServiceComponent implements OnInit {
  services!: ServiceOption[];
  neatService!: ServiceOption;

  constructor(private service: NeatService, public dialog: MatDialog) { }
  ngOnInit(): void {
    this.service.getServices().subscribe((services)=> {
      this.services = services;
    });
  }

  openAddServiceDialog(): void {
    const dialogRef = this.dialog.open(AddServiceDialogComponent, {
      width: '300px',  
      data: {}  
    });

  dialogRef.afterClosed().subscribe(result => {
      const newService = { ...result, servicePrice:(result.servicePrice) };
      this.service.createService(newService).subscribe(createdService => {
      this.services.push(createdService);
    
    });

  });

  
  
  }

  
  
  deleteService(service: ServiceOption): void {
    const confirmDelete = confirm(`Are you sure you want to delete ${service.serviceName}?`);
  
    if (confirmDelete) {
      this.service.deleteService(service).subscribe(() => {
        this.services = this.services.filter(s => s.serviceId !== service.serviceId);
      });
    }
  }

  openEditServiceDialog(service: ServiceOption): void {
    const dialogRef = this.dialog.open(EditServiceDialogComponent, {
      width: '300px',  
      data: {
        serviceId: service.serviceId,
        service: service
        
      }  
    });

  };

  



  
}


