import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/models/heat_alert.dart';
import 'package:heatshield_mobile/services/api_service.dart';

final alertProvider = StateNotifierProvider<AlertNotifier, AlertState>((ref) {
  return AlertNotifier(ref.read(apiServiceProvider));
});

class AlertState {
  final List<HeatAlert> alerts;
  final bool isLoading;
  final String? error;

  AlertState({
    this.alerts = const [],
    this.isLoading = false,
    this.error,
  });

  AlertState copyWith({
    List<HeatAlert>? alerts,
    bool? isLoading,
    String? error,
  }) {
    return AlertState(
      alerts: alerts ?? this.alerts,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class AlertNotifier extends StateNotifier<AlertState> {
  final ApiService _apiService;

  AlertNotifier(this._apiService) : super(AlertState()) {
    fetchAlerts();
  }

  Future<void> fetchAlerts({int? locationId}) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final response = await _apiService.getHeatAlerts(locationId: locationId);
      final alerts = (response.data as List)
          .map((json) => HeatAlert.fromJson(json))
          .toList();
      
      state = state.copyWith(
        alerts: alerts,
        isLoading: false,
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }
}
