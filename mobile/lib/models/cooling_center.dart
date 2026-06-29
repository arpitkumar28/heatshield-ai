class CoolingCenter {
  final int id;
  final String name;
  final double latitude;
  final double longitude;
  final String address;
  final int capacity;
  final int currentOccupancy;
  final List<String> facilities;
  final String operatingHours;
  final String contactPhone;

  CoolingCenter({
    required this.id,
    required this.name,
    required this.latitude,
    required this.longitude,
    required this.address,
    required this.capacity,
    required this.currentOccupancy,
    required this.facilities,
    required this.operatingHours,
    required this.contactPhone,
  });

  factory CoolingCenter.fromJson(Map<String, dynamic> json) {
    return CoolingCenter(
      id: json['id'],
      name: json['name'],
      latitude: json['latitude'].toDouble(),
      longitude: json['longitude'].toDouble(),
      address: json['address'],
      capacity: json['capacity'],
      currentOccupancy: json['current_occupancy'],
      facilities: List<String>.from(json['facilities']),
      operatingHours: json['operating_hours'],
      contactPhone: json['contact_phone'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'latitude': latitude,
      'longitude': longitude,
      'address': address,
      'capacity': capacity,
      'current_occupancy': currentOccupancy,
      'facilities': facilities,
      'operating_hours': operatingHours,
      'contact_phone': contactPhone,
    };
  }

  double get occupancyPercentage => (currentOccupancy / capacity) * 100;
  String get distance => '0.0'; // To be calculated based on user location
}
