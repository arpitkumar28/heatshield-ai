import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/models/location.dart';
import 'package:heatshield_mobile/services/api_service.dart';

final locationProvider = StateNotifierProvider<LocationNotifier, LocationState>((ref) {
  return LocationNotifier(ref.read(apiServiceProvider));
});

class LocationState {
  final List<Location> locations;
  final Location? selectedLocation;
  final bool isLoading;
  final String? error;

  LocationState({
    this.locations = const [],
    this.selectedLocation,
    this.isLoading = false,
    this.error,
  });

  LocationState copyWith({
    List<Location>? locations,
    Location? selectedLocation,
    bool? isLoading,
    String? error,
  }) {
    return LocationState(
      locations: locations ?? this.locations,
      selectedLocation: selectedLocation ?? this.selectedLocation,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class LocationNotifier extends StateNotifier<LocationState> {
  final ApiService _apiService;

  LocationNotifier(this._apiService) : super(LocationState()) {
    fetchLocations();
  }

  Future<void> fetchLocations() async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final response = await _apiService.getLocations();
      final locations = (response.data as List)
          .map((json) => Location.fromJson(json))
          .toList();
      
      state = state.copyWith(
        locations: locations,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  void selectLocation(Location location) {
    state = state.copyWith(selectedLocation: location);
  }
}
