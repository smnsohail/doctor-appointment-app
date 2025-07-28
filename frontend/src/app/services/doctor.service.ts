import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:5000/api';

  constructor(private http: HttpClient) {}

  searchDoctors(filters: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors`, { params: filters });
  }

  getDoctorById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/${id}`);
  }

  getNearbyDoctors(lat: number, lng: number, radius: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/doctors/nearby`, {
      params: { lat: lat.toString(), lng: lng.toString(), radius: radius.toString() }
    });
  }
}
