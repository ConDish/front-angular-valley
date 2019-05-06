import { Component, OnInit } from '@angular/core';
import { PatientService } from './patient.service';
import { Patient } from './Patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  constructor(public patientService: PatientService) {


  }

  ngOnInit() {
    this.patientService.refreshList();
    this.patientService.getCities();
    this.patientService.getDoctors();
    
  }

  deletePatient(patient: Patient) {


    this.patientService.deletePatient(patient.id).subscribe(response => {

      this.patientService.refreshList();
      this.patientService.flagButton = true;
      
    });
   


  }

}
