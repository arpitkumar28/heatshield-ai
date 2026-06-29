import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/models/cooling_center.dart';
import 'package:heatshield_mobile/services/api_service.dart';

final coolingCenterProvider = StateNotifierProvider<CoolingCenterNotifier, CoolingCenterState>((ref) {
  return CoolingCenterNotifier(ref.read(apiServiceProvider));
});

class CoolingCenterState {
  final List<CoolingCenter> coolingCenters;
  final bool isLoading;
  final String? error;

  CoolingCenterState({
    this.coolingCenters = const [],
    this.isLoading = false,
    this.error,
  });

  CoolingCenterState copyWith({
    List<CoolingCenter>? coolingCenters,
    bool? isLoading,
    String? error,
  }) {
    return CoolingCenterState(
      coolingCenters: coolingCenters ?? this.coolingCenters,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class CoolingCenterNotifier extends StateNotifier<CoolingCenterState> {
  final ApiService _apiService;

  CoolingCenterNotifier(this._apiService) : super(CoolingCenterState());

  Future<void> fetchNearbyCoolingCenters(double latitude, double longitude) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final response = await _apiService.getNearbyCoolingCenters(latitude, longitude);
      final coolingCenters = (response.data as List)
          .map((json) => CoolingCenter.fromJson(json))
          .toList();
      
      state = state.copyWith(
        coolingCenters: coolingCenters,
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
