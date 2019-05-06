import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Patient } from './Patient';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  // Variables
  patients: Patient[];
  cities: [];
  doctors: [];
  constructor(private http: HttpClient) {


  }

  refreshList() {
    this.http.get('https://cors-anywhere.herokuapp.com/https://desolate-bastion-30255.herokuapp.com/api/patient')
      .toPromise().then(res => this.patients = res as Patient[]);


  }
  // Get all patients of data base in API - REST
  getPatients() {
    return this.http.get<Patient[]>('https://cors-anywhere.herokuapp.com/https://desolate-bastion-30255.herokuapp.com/api/patient');
  }

  // Get all cities of data base in API - REST
  getCities() {
    return this.http.get('https://cors-anywhere.herokuapp.com/https://desolate-bastion-30255.herokuapp.com/api/city')
      .toPromise().then(res => this.cities = res as []);
  }

  // Get all doctors of data base in API - REST
  getDoctors() {
    return this.http.get('https://cors-anywhere.herokuapp.com/https://desolate-bastion-30255.herokuapp.com/api/doctor')
      .toPromise().then(res => this.doctors = res as []);
  }

  // Create a Patient
  createPatient(name, email, password, doctor, city) {

    let patient  = {
      "name": name.value,
      "email": email.value,
      "password": password.value,
      "doctor_id": 1,
      "city_id": 1
    };


    console.log(JSON.stringify(patient))

    let headers = new HttpHeaders().set('X-Requested-With', 'XMLHttpRequest');

    this.http.put("https://desolate-bastion-30255.herokuapp.com/api/patient/create/", JSON.stringify(patient), {headers : headers})
    .toPromise().then(res => console.log(res));

    return false;

  }
  // Delete a Patient
  deletePatient(id_patient: number) {

    return this.http.delete(`https://cors-anywhere.herokuapp.com/https://desolate-bastion-30255.herokuapp.com/api/patient/delete/${id_patient}`);

  }
}
