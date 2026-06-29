import 'package:flutter/material.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';

class HeatMarker {
  static Marker build({
    required double lat,
    required double lng,
    required double temp,
    required Color color,
  }) {
    return Marker(
      point: LatLng(lat, lng),
      width: 50,
      height: 50,
      builder: (context) => Container(
        decoration: BoxDecoration(
          color: color.withOpacity(0.4),
          shape: BoxShape.circle,
          border: Border.all(color: color, width: 2),
          boxShadow: [
            BoxShadow(
              color: color,
              blurRadius: 10,
              spreadRadius: 2,
            ),
          ],
        ),
        child: Center(
          child: Text(
            '${temp.toInt()}°',
            style: const TextStyle(
              color: Colors.white,
              fontWeight: FontWeight.bold,
              fontSize: 11,
            ),
          ),
        ),
      ),
    );
  }
}
