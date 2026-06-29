# HeatShield AI Mobile App

A Flutter mobile application for the HeatShield AI Urban Heat Intelligence Platform.

## Features

- **Live Heat Map**: Real-time visualization of urban heat hotspots with interactive map
- **Heat Alerts**: Real-time notifications and alerts for extreme heat conditions
- **Cooling Centers**: Find nearby cooling centers with real-time occupancy data
- **Analytics**: Detailed heat data analytics with charts and trends
- **User Profile**: Personalized settings and user management

## Tech Stack

- **Framework**: Flutter 3.0+
- **State Management**: Riverpod
- **Networking**: Dio
- **Maps**: flutter_map with latlong2
- **Location**: geolocator
- **Charts**: fl_chart
- **Local Storage**: shared_preferences
- **Notifications**: flutter_local_notifications

## Prerequisites

- Flutter SDK 3.0 or higher
- Dart 3.0 or higher
- Android Studio / Xcode (for mobile development)
- A backend API running at `http://localhost:8000/api/v1`

## Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd heatshield-ai/mobile
```

2. Install dependencies:
```bash
flutter pub get
```

3. Run the app:
```bash
# For Android
flutter run

# For iOS
flutter run
```

### Configuration

Update the API base URL in `lib/services/api_service.dart`:
```dart
final String baseUrl = 'http://your-api-url.com/api/v1';
```

## Project Structure

```
lib/
├── main.dart                 # App entry point
├── models/                   # Data models
│   ├── user.dart
│   ├── location.dart
│   ├── heat_data.dart
│   ├── cooling_center.dart
│   ├── heat_alert.dart
│   └── recommendation.dart
├── providers/                # Riverpod state management
│   ├── auth_provider.dart
│   ├── location_provider.dart
│   ├── heat_data_provider.dart
│   ├── alert_provider.dart
│   └── cooling_center_provider.dart
├── screens/                  # UI screens
│   ├── login_screen.dart
│   ├── register_screen.dart
│   ├── home_screen.dart
│   ├── heat_map_screen.dart
│   ├── alerts_screen.dart
│   ├── cooling_centers_screen.dart
│   ├── analytics_screen.dart
│   └── profile_screen.dart
├── services/                 # API services
│   └── api_service.dart
├── theme/                    # App theming
│   └── app_theme.dart
└── widgets/                  # Reusable widgets
    ├── loading_widget.dart
    ├── error_widget.dart
    ├── stat_card.dart
    ├── empty_state_widget.dart
    └── heat_marker.dart
```

## API Integration

The app integrates with the HeatShield AI backend API. Key endpoints:

- Authentication: `/auth/login`, `/auth/register`
- Locations: `/locations`
- Heat Data: `/locations/{id}/heat-data`
- Alerts: `/heat-alerts`
- Cooling Centers: `/cooling-centers/nearby`
- Analytics: `/analytics/heat-trends`

See [API Documentation](../../docs/api/API_DOCUMENTATION.md) for details.

## Permissions

### Android
- Internet
- Access Fine Location
- Access Coarse Location
- Post Notifications

### iOS
- Location When In Use
- Location Always and When In Use
- Location Always

## Build & Release

### Android
```bash
flutter build apk --release
flutter build appbundle --release
```

### iOS
```bash
flutter build ios --release
```

## Testing

Run tests:
```bash
flutter test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, please open an issue in the repository or contact the development team.
