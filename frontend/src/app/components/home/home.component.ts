import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthService } from '../../services/auth.service';
import { DoctorService } from '../../services/doctor.service';
import { GoogleMapsModule, MapMarker } from "@angular/google-maps";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, FormsModule, MatInputModule, MatButtonModule, 
    MatSelectModule, MatCardModule, MatSnackBarModule, GoogleMapsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  doctors: any[] = [];
  selectedSpecialization = '';
  searchRadius = 10;
  userLocation: any = null;
  showMap = false;
  mapCenter = { lat: 19.076, lng: 72.8777 }; // Default to Mumbai
  userMarkerOptions = {
    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
    }
  };

  constructor(
    private doctorService: DoctorService,
    private authService: AuthService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getCurrentLocation();
    this.loadAllDoctors();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          this.mapCenter = this.userLocation;
        },
        (error) => {
          console.log('Error getting location:', error);
          this.snackBar.open('Unable to get your location', 'Close', { duration: 3000 });
        }
      );
    }
  }

  loadAllDoctors() {
    this.doctorService.searchDoctors({}).subscribe({
      next: (response) => {
        this.doctors = this.processDoctorsData(response);
        this.showMap = true;
      },
      error: (error) => {
        console.error('Error loading doctors:', error);
      }
    });
  }

  searchDoctors() {
    const filters: any = {};
    if (this.selectedSpecialization) {
      filters.specialization = this.selectedSpecialization;
    }

    this.doctorService.searchDoctors(filters).subscribe({
      next: (response) => {
        this.doctors = this.processDoctorsData(response);
        this.showMap = true;
        this.snackBar.open(`Found ${this.doctors.length} doctors`, 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Error searching doctors', 'Close', { duration: 3000 });
      }
    });
  }

  findNearbyDoctors() {
    if (!this.userLocation) {
      this.snackBar.open('Please allow location access to find nearby doctors', 'Close', { duration: 3000 });
      return;
    }

    this.doctorService.getNearbyDoctors(
      this.userLocation.lat, 
      this.userLocation.lng, 
      this.searchRadius * 1000 // Convert km to meters
    ).subscribe({
      next: (response) => {
        this.doctors = this.processDoctorsData(response);
        this.showMap = true;
        this.snackBar.open(`Found ${this.doctors.length} nearby doctors`, 'Close', { duration: 3000 });
      },
      error: (error) => {
        this.snackBar.open('Error finding nearby doctors', 'Close', { duration: 3000 });
      }
    });
  }

  processDoctorsData(doctors: any[]) {
    return doctors.map(doctor => ({
      ...doctor,
      position: {
        lat: doctor.location?.coordinates[1] || this.mapCenter.lat,
        lng: doctor.location?.coordinates[0] || this.mapCenter.lng
      }
    }));
  }

  viewOnMap(doctor: any) {
    this.mapCenter = doctor.position;
    this.showMap = true;
  }

  bookAppointment(doctor: any) {
    // Navigate to appointment booking page
    this.snackBar.open('Appointment booking feature coming soon!', 'Close', { duration: 3000 });
  }

  openInfoWindow(doctor: any) {
    // Open info window on map
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}