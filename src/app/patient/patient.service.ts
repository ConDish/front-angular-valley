import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Patient } from './Patient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { 

  
  }

  getPatients() {
    
    // Petitions
    return this.http.get<Patient[]>('https://cors-anywhere.herokuapp.com/https://desolate-bastion-30255.herokuapp.com/api/patient');
  }

  deletePatient(id_patient: number){
    
     

    return this.http.delete(`https://cors-anywhere.herokuapp.com/https://desolate-bastion-30255.herokuapp.com/api/patient/delete/${id_patient}`);
  
  }
}
