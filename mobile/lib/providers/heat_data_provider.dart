import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/models/heat_data.dart';
import 'package:heatshield_mobile/services/api_service.dart';

final heatDataProvider = StateNotifierProvider<HeatDataNotifier, HeatDataState>((ref) {
  return HeatDataNotifier(ref.read(apiServiceProvider));
});

class HeatDataState {
  final List<HeatData> heatData;
  final bool isLoading;
  final String? error;

  HeatDataState({
    this.heatData = const [],
    this.isLoading = false,
    this.error,
  });

  HeatDataState copyWith({
    List<HeatData>? heatData,
    bool? isLoading,
    String? error,
  }) {
    return HeatDataState(
      heatData: heatData ?? this.heatData,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class HeatDataNotifier extends StateNotifier<HeatDataState> {
  final ApiService _apiService;

  HeatDataNotifier(this._apiService) : super(HeatDataState());

  Future<void> fetchHeatData(int locationId) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final response = await _apiService.getHeatData(locationId);
      final heatData = (response.data as List)
          .map((json) => HeatData.fromJson(json))
          .toList();
      
      state = state.copyWith(
        heatData: heatData,
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
