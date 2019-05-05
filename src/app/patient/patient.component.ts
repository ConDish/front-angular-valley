import { Component, OnInit } from '@angular/core';
import { PatientService } from './patient.service';
import { Patient } from './Patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnInit {

  // Variables
  patients: Patient[];

  constructor(private patientService: PatientService) {

    this.patientService.getPatients().subscribe(response => {
      this.patients = response;
    });

  }

  ngOnInit() {
  }

  deletePatient(patient: Patient) {


    this.patientService.deletePatient(patient.id).subscribe(response => {
       

      
    });
   


  }

}
