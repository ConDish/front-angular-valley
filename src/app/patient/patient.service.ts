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
  alertError: boolean;
  alertSuccess: boolean;
  flagButton: boolean = true;
  name: string;
  email: string;
  password: string;
  idPatient: number;
  messageUC : string;




  constructor(private http: HttpClient) {


  }

  refreshList() {
    this.http.get('https://desolate-bastion-30255.herokuapp.com/api/patient')
      .toPromise().then(res => this.patients = res as Patient[]);


  }
  // Get all patients of data base in API - REST
  getPatients() {
    return this.http.get<Patient[]>('https://desolate-bastion-30255.herokuapp.com/api/patient');
  }

  // Get all cities of data base in API - REST
  getCities() {
    return this.http.get('https://desolate-bastion-30255.herokuapp.com/api/city')
      .toPromise().then(res => this.cities = res as []);
  }

  // Get all doctors of data base in API - REST
  getDoctors() {
    return this.http.get('https://desolate-bastion-30255.herokuapp.com/api/doctor')
      .toPromise().then(res => this.doctors = res as []);
  }
  // Get one Patient with your id
  getPatient(patient: Patient) {

    this.http.get<Patient>(`https://desolate-bastion-30255.herokuapp.com/api/patient/find/${patient.id}`).toPromise().then(res => {

      this.flagButton = false;

      setTimeout(() => {
        this.flagButton = true;
      }, 5000);

      this.idPatient = res.id;
      this.name = res.name;
      this.email = res.email;

    });

  }

  // Create a Patient
  createPatient(name, email, password, doctor, city) {

    if (this.flagButton) {


      let patient = {
        "name": name.value,
        "email": email.value,
        "password": password.value,
        "doctor_id": doctor.value,
        "city_id": city.value
      };

      this.http.post('https://desolate-bastion-30255.herokuapp.com/api/patient/create', patient)
        .toPromise<any>().then(res => {
          if (res.success) {
            this.messageUC = "Se creo correctamente";
            this.alertSuccess = true;
            this.refreshList();
          } else {
            this.messageUC = "No se pudo crear el usuario!";
            this.alertError = true;

          }
        });
    } else {

      let patient = {
        "id": this.idPatient,
        "name": name.value,
        "email": email.value,
        "password": (password.value) ? password.value : null,
        "doctor_id": doctor.value,
        "city_id": city.value
      };

      this.http.post('https://desolate-bastion-30255.herokuapp.com/api/patient/update', patient)
        .toPromise<any>().then(res => {
          if (res.success) {
            this.messageUC = "Se actualizo correctamente";
            this.alertSuccess = true;
            this.refreshList();
            this.flagButton = true;
          } else {
            this.messageUC = "No se pudo actualizar el correo ya existe!";
            this.alertError = true;

          }
        });

    }

    return false;

  }
  // Delete a Patient
  deletePatient(id_patient: number) {

    return this.http.delete(`https://desolate-bastion-30255.herokuapp.com/api/patient/delete/${id_patient}`);

  }
}
