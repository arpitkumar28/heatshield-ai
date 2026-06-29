class Location {
  final int id;
  final String name;
  final double latitude;
  final double longitude;
  final String locationType;
  final int? population;
  final double? areaSqkm;

  Location({
    required this.id,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.locationType,
    this.population,
    this.areaSqkm,
  });

  factory Location.fromJson(Map<String, dynamic> json) {
    return Location(
      id: json['id'],
      name: json['name'],
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
      locationType: json['location_type'],
      population: json['population'],
      areaSqkm: json['area_sqkm']?.toDouble(),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'latitude': latitude,
      'longitude': longitude,
      'location_type': locationType,
      'population': population,
      'area_sqkm': areaSqkm,
    };
  }
}
