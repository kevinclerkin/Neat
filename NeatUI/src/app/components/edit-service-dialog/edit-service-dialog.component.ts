import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServiceOption } from '../../models/service-option';
import { NeatService } from '../../services/neat-service.service';


@Component({
  selector: 'app-edit-service-dialog',
  templateUrl: './edit-service-dialog.component.html',
  styleUrl: './edit-service-dialog.component.css'
})
export class EditServiceDialogComponent {

  serviceForm: FormGroup;
  service!: ServiceOption;

  constructor(
    public dialogRef: MatDialogRef<EditServiceDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private neatService: NeatService
  ) {
    this.serviceForm = this.formBuilder.group({
      serviceName: ['', Validators.required],
      servicePrice: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  /*onSubmit(): void {
    const updatedService = {...this.serviceForm.value, servicePrice: parseInt(this.serviceForm.value.servicePrice, 10) };
    this.neatService.updateService(updatedService).subscribe;
    this.dialogRef.close(updatedService);
    console.log(updatedService);

    this.dialogRef.close({ serviceId: this.data.serviceId, service: updatedService });
  }*/

  onSubmit(): void {}

}
