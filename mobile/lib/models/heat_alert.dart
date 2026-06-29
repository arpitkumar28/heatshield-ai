class HeatAlert {
  final int id;
  final int locationId;
  final String alertType;
  final String severity;
  final String title;
  final String message;
  final DateTime startTime;
  final DateTime endTime;
  final double maxTemperature;
  final double minTemperature;
  final double humidity;
  final double heatIndex;
  final int affectedPopulation;
  final String areaDescription;
  final bool isActive;

  HeatAlert({
    required this.id,
    required this.locationId,
    required this.alertType,
    required this.severity,
    required this.title,
    required this.message,
    required this.startTime,
    required this.endTime,
    required this.maxTemperature,
    required this.minTemperature,
    required this.humidity,
    required this.heatIndex,
    required this.affectedPopulation,
    required this.areaDescription,
    required this.isActive,
  });

  factory HeatAlert.fromJson(Map<String, dynamic> json) {
    return HeatAlert(
      id: json['id'],
      locationId: json['location_id'],
      alertType: json['alert_type'],
      severity: json['severity'],
      title: json['title'],
      message: json['message'],
      startTime: DateTime.parse(json['start_time']),
      endTime: DateTime.parse(json['end_time']),
      maxTemperature: json['max_temperature'].toDouble(),
      minTemperature: json['min_temperature'].toDouble(),
      humidity: json['humidity'].toDouble(),
      heatIndex: json['heat_index'].toDouble(),
      affectedPopulation: json['affected_population'],
      areaDescription: json['area_description'],
      isActive: json['is_active'] ?? true,
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'location_id': locationId,
      'alert_type': alertType,
      'severity': severity,
      'title': title,
      'message': message,
      'start_time': startTime.toIso8601String(),
      'end_time': endTime.toIso8601String(),
      'max_temperature': maxTemperature,
      'min_temperature': minTemperature,
      'humidity': humidity,
      'heat_index': heatIndex,
      'affected_population': affectedPopulation,
      'area_description': areaDescription,
      'is_active': isActive,
    };
  }

  String get severityDisplay => severity.toUpperCase();
}
