import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/models/user.dart';
import 'package:heatshield_mobile/services/api_service.dart';
import 'package:shared_preferences/shared_preferences.dart';

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(ref.read(apiServiceProvider));
});

final apiServiceProvider = Provider<ApiService>((ref) {
  return ApiService();
});

class AuthState {
  final User? user;
  final bool isAuthenticated;
  final bool isLoading;
  final String? error;

  AuthState({
    this.user,
    this.isAuthenticated = false,
    this.isLoading = false,
    this.error,
  });

  AuthState copyWith({
    User? user,
    bool? isAuthenticated,
    bool? isLoading,
    String? error,
  }) {
    return AuthState(
      user: user ?? this.user,
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      isLoading: isLoading ?? this.isLoading,
      error: error,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final ApiService _apiService;

  AuthNotifier(this._apiService) : super(AuthState()) {
    _checkAuthStatus();
  }

  Future<void> _checkAuthStatus() async {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString('auth_token');
    final userId = prefs.getInt('user_id');
    
    if (token != null && userId != null) {
      // In a real app, you would fetch user details from API
      state = state.copyWith(
        isAuthenticated: true,
        user: User(
          id: userId,
          email: 'user@example.com',
          username: 'user',
          fullName: 'User',
          role: 'public',
        ),
      );
    }
  }

  Future<void> login(String email, String password) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      final response = await _apiService.login(email, password);
      final token = response.data['access_token'];
      
      final prefs = await SharedPreferences.getInstance();
      await prefs.setString('auth_token', token);
      
      state = state.copyWith(
        isAuthenticated: true,
        isLoading: false,
        user: User(
          id: 1,
          email: email,
          username: email.split('@')[0],
          fullName: 'User',
          role: 'public',
        ),
      );
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  Future<void> register(Map<String, dynamic> data) async {
    state = state.copyWith(isLoading: true, error: null);
    
    try {
      await _apiService.register(data);
      state = state.copyWith(isLoading: false);
    } catch (e) {
      state = state.copyWith(
        isLoading: false,
        error: e.toString(),
      );
    }
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('auth_token');
    await prefs.remove('user_id');
    
    state = AuthState();
  }
}
