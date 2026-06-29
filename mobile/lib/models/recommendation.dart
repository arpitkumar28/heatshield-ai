class Recommendation {
  final int id;
  final int locationId;
  final String title;
  final String description;
  final String category;
  final String priority;
  final double temperatureReduction;
  final double costEstimate;
  final String implementationTime;
  final double benefitCostRatio;
  final String status;

  Recommendation({
    required this.id,
    required this.locationId,
    required this.title,
    required this.description,
    required this.category,
    required this.priority,
    required this.temperatureReduction,
    required this.costEstimate,
    required this.implementationTime,
    required this.benefitCostRatio,
    required this.status,
  });

  factory Recommendation.fromJson(Map<String, dynamic> json) {
    return Recommendation(
      id: json['id'],
      locationId: json['location_id'],
      title: json['title'],
      description: json['description'],
      category: json['category'],
      priority: json['priority'],
      temperatureReduction: json['temperature_reduction'].toDouble(),
      costEstimate: json['cost_estimate'].toDouble(),
      implementationTime: json['implementation_time'],
      benefitCostRatio: json['benefit_cost_ratio'].toDouble(),
      status: json['status'],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'location_id': locationId,
      'title': title,
      'description': description,
      'category': category,
      'priority': priority,
      'temperature_reduction': temperatureReduction,
      'cost_estimate': costEstimate,
      'implementation_time': implementationTime,
      'benefit_cost_ratio': benefitCostRatio,
      'status': status,
    };
  }
}
