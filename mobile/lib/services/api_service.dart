import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio;
  final String baseUrl = 'http://localhost:8000/api/v1';

  ApiService() : _dio = Dio(BaseOptions(baseUrl: baseUrl)) {
    _dio.interceptors.add(InterceptorsWrapper(
      onRequest: (options, handler) {
        // Add auth token if available
        final token = ''; // Get from secure storage
        if (token.isNotEmpty) {
          options.headers['Authorization'] = 'Bearer $token';
        }
        return handler.next(options);
      },
    ));
  }

  // Auth endpoints
  Future<Response> login(String email, String password) async {
    return await _dio.post('/auth/login', data: {
      'username': email,
      'password': password,
    });
  }

  Future<Response> register(Map<String, dynamic> data) async {
    return await _dio.post('/auth/register', data: data);
  }

  // Location endpoints
  Future<Response> getLocations() async {
    return await _dio.get('/locations');
  }

  Future<Response> getHeatData(int locationId) async {
    return await _dio.get('/locations/$locationId/heat-data');
  }

  Future<Response> getHotspots({double threshold = 0.7}) async {
    return await _dio.get('/hotspots', queryParameters: {'threshold': threshold});
  }

  Future<Response> getNearbyCoolingCenters(
    double latitude,
    double longitude, {
    double radius = 5.0,
  }) async {
    return await _dio.get('/cooling-centers/nearby', queryParameters: {
      'latitude': latitude,
      'longitude': longitude,
      'radius_km': radius,
    });
  }

  // Alert endpoints
  Future<Response> getHeatAlerts({int? locationId}) async {
    return await _dio.get('/heat-alerts', queryParameters: {
      if (locationId != null) 'location_id': locationId,
    });
  }

  // Analytics endpoints
  Future<Response> getHeatTrends(int locationId, int days) async {
    return await _dio.get('/analytics/heat-trends', queryParameters: {
      'location_id': locationId,
      'days': days,
    });
  }

  Future<Response> getAnalyticsSummary() async {
    return await _dio.get('/analytics/summary');
  }
}
