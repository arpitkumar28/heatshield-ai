class HeatData {
  final int id;
  final int locationId;
  final DateTime timestamp;
  final double landSurfaceTemperature;
  final double airTemperature;
  final double heatIndex;
  final double ndvi;
  final double ndwi;
  final double albedo;
  final double emissivity;
  final double urbanDensity;
  final double imperviousSurface;

  HeatData({
    required this.id,
    required this.locationId,
    required this.timestamp,
    required this.landSurfaceTemperature,
    required this.airTemperature,
    required this.heatIndex,
    required this.ndvi,
    required this.ndwi,
    required this.albedo,
    required this.emissivity,
    required this.urbanDensity,
    required this.imperviousSurface,
  });

  factory HeatData.fromJson(Map<String, dynamic> json) {
    return HeatData(
      id: json['id'],
      locationId: json['location_id'],
      timestamp: DateTime.parse(json['timestamp']),
      landSurfaceTemperature: json['land_surface_temperature'].toDouble(),
      airTemperature: json['air_temperature'].toDouble(),
      heatIndex: json['heat_index'].toDouble(),
      ndvi: json['ndvi'].toDouble(),
      ndwi: json['ndwi'].toDouble(),
      albedo: json['albedo'].toDouble(),
      emissivity: json['emissivity'].toDouble(),
      urbanDensity: json['urban_density'].toDouble(),
      imperviousSurface: json['impervious_surface'].toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'location_id': locationId,
      'timestamp': timestamp.toIso8601String(),
      'land_surface_temperature': landSurfaceTemperature,
      'air_temperature': airTemperature,
      'heat_index': heatIndex,
      'ndvi': ndvi,
      'ndwi': ndwi,
      'albedo': albedo,
      'emissivity': emissivity,
      'urban_density': urbanDensity,
      'impervious_surface': imperviousSurface,
    };
  }
}
