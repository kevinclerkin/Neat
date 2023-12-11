import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceOption } from '../../models/service-option';
import { NeatService } from '../../services/neat-service.service';

@Component({
  selector: 'app-add-service-dialog',
  templateUrl: './add-service-dialog.component.html',
  styleUrls: ['./add-service-dialog.component.css']
})
export class AddServiceDialogComponent {
  serviceForm: FormGroup;
  service!: ServiceOption;

  constructor(
    public dialogRef: MatDialogRef<AddServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private neatService: NeatService
  ) {
    this.serviceForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      servicePrice: ['', Validators.required],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSubmit(): void {
    const newService = {...this.serviceForm.value, servicePrice: parseInt(this.serviceForm.value.servicePrice, 10) };
    this.neatService.createService(newService).subscribe;
    this.dialogRef.close(newService);
    console.log(newService);
  }
}