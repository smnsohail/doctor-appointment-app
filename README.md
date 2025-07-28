# Doctor Appointment Booking System (MEAN Stack)

A full-stack Doctor Appointment Booking System built with the MEAN stack (MongoDB, Express.js, Angular 19, Node.js).  
This application allows patients and doctors to register, log in, search for doctors by specialization and location, view nearby doctors on Google Maps, and book appointments.

## Features

### Implemented Features
- **User Roles & Authentication**  
  - Patients and Doctors can register and log in securely using JWT-based authentication.  
  - Role-based access control for different features.

- **Doctor Profile Management**  
  - Doctors can add their specialization, qualifications, clinic details, and clinic location.

- **Patient Doctor Search**  
  - Patients can search doctors by specialization.  
  - Geospatial “nearby” search based on patient’s location using MongoDB geospatial queries.

- **Google Maps Integration**  
  - Visualize doctor locations and patient location on Google Map.  
  - Distance calculation and radius filtering for nearby doctors.

- **Appointment Booking (Basic)**  
  - Patients can book appointments with doctors (appointment booking UI is in progress).

- **Responsive UI**  
  - Angular 19 standalone components with Angular Material for polished, accessible UI.

- **JWT Token Handling**  
  - Angular HTTP interceptors automatically include JWT tokens for authenticated API requests.

### Upcoming Features
- Doctor availability calendar and advanced scheduling.  
- Appointment cancellation and rescheduling.  
- Notifications via Email/SMS.  
- User profile editing and management.  
- Pagination and filters for searching.  
- Real-time updates and notifications.

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)  
- npm (comes with Node.js)  
- Angular CLI (`npm install -g @angular/cli`)  
- MongoDB (local installation or MongoDB Atlas)  
- Google Cloud API Key (with Maps JavaScript API enabled)

### Installation and Setup

#### 1. Clone the repository
```
git clone https://github.com/smnsohail/doctor-appointment-app.git
cd doctor-appointment-app
```

#### 2. Backend Setup

Create a `.env` file inside the `backend` folder with:
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000



##### Start the backend server:
```
npm run start
```

The backend will run at `http://localhost:5000`.

#### 3. Frontend Setup
Open a new terminal:
```
cd frontend
npm install -y
```

Edit `src/environments/environment.ts` and set your API and Google Maps key:
```
export const environment = {production: false,
apiUrl: 'http://localhost:5000/api',
googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
};
```
##### Start the Angular development server:
```
ng serve --open
```

The frontend will be at `http://localhost:4200`.

## How to Use

- **Register:** Visit `/register`, choose Patient or Doctor, fill details, and submit.  
- **Login:** Visit `/login`, enter email/password and role, and log in.  
- **Search Doctors:** Use search filters on the home page or “Find Nearby” feature to locate doctors.  
- **View Map:** See doctor locations and user location on the integrated Google Map.  
- **Book Appointment:** Once logged in, choose doctors and book appointments (feature in progress).

## Testing

- Use Postman or curl for backend endpoints testing, e.g.:  
  - `POST /api/auth/doctor/register`  
  - `POST /api/auth/patient/register`  
  - `POST /api/auth/doctor/login`  
  - `GET /api/doctors`  
  - `GET /api/doctors/nearby?lat=<lat>&lng=<lng>&radius=<meters>`



## Project Structure

- **backend/** – REST API with Node.js + Express, Mongoose models, authentication, and routes.  
- **frontend/** – Angular 19 standalone app with Angular Material UI and HTTP client for API integration.

## Deployment

### Backend
- Setup `.env.production` with production MongoDB and secret keys.  
- Deploy using Heroku, Railway, AWS EC2, DigitalOcean, etc.

### Frontend
- Build for production:  

```
ng build --configuration production
```
- Host on Netlify, Vercel, Firebase Hosting, or similar.

## Troubleshooting Tips

- Ensure CORS is enabled in backend to allow frontend requests.  
- Verify Google Maps API key permissions and billing setup.  
- Check MongoDB connectivity and correct connection string.  
- Inspect browser console and backend logs for error details.

## Contributing

Feel free to fork the repo, make improvements, and submit pull requests.

## License

MIT License

## Contact

Maintained by Md.Sohil  
GitHub Repo: https://github.com/smnsohail/doctor-appointment-app.git
