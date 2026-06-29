import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_map/flutter_map.dart';
import 'package:latlong2/latlong.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class HeatMapScreen extends ConsumerStatefulWidget {
  const HeatMapScreen({super.key});

  @override
  ConsumerState<HeatMapScreen> createState() => _HeatMapScreenState();
}

class _HeatMapScreenState extends ConsumerState<HeatMapScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Live Heat Map'),
        actions: [
          Container(
            margin: const EdgeInsets.only(right: 16),
            padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
            decoration: BoxDecoration(
              color: AppTheme.success.withOpacity(0.2),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(color: AppTheme.success.withOpacity(0.5)),
            ),
            child: Row(
              children: [
                Container(
                  width: 8,
                  height: 8,
                  decoration: const BoxDecoration(
                    color: AppTheme.success,
                    shape: BoxShape.circle,
                  ),
                ),
                const SizedBox(width: 8),
                const Text(
                  'LIVE',
                  style: TextStyle(
                    color: AppTheme.success,
                    fontSize: 12,
                    fontWeight: FontWeight.bold,
                  ),
                ),
              ],
            ),
          ),
        ],
      ),
      body: Column(
        children: [
          // Stats Cards - Premium Glass Design
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              border: Border(
                bottom: BorderSide(color: Colors.white.withOpacity(0.1)),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildStatCard('Temperature', '38.5°C', AppTheme.primary, Icons.thermostat),
                _buildStatCard('Heat Index', '42.1°C', AppTheme.danger, Icons.whatshot),
                _buildStatCard('NDVI', '0.35', AppTheme.success, Icons.eco),
              ],
            ),
          ),
          // Map
          Expanded(
            child: FlutterMap(
              options: MapOptions(
                center: LatLng(28.6139, 77.2090),
                zoom: 13.0,
              ),
              children: [
                TileLayer(
                  urlTemplate: 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
                  subdomains: const ['a', 'b', 'c', 'd'],
                  userAgentPackageName: 'com.example.heatshield_mobile',
                ),
                // Heat hotspots (simulated with circles)
                MarkerLayer(
                  markers: [
                    _buildHeatMarker(28.6139, 77.2090, 45, AppTheme.danger),
                    _buildHeatMarker(28.6200, 77.2150, 42, AppTheme.primary),
                    _buildHeatMarker(28.6080, 77.2020, 38, AppTheme.warning),
                    _buildHeatMarker(28.6250, 77.2200, 40, AppTheme.primary),
                  ],
                ),
              ],
            ),
          ),
          // Legend - Premium Design
          Container(
            padding: const EdgeInsets.all(16),
            decoration: BoxDecoration(
              color: AppTheme.surface,
              border: Border(
                top: BorderSide(color: Colors.white.withOpacity(0.1)),
              ),
            ),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceAround,
              children: [
                _buildLegendItem(AppTheme.success, 'Low'),
                _buildLegendItem(AppTheme.warning, 'Moderate'),
                _buildLegendItem(AppTheme.primary, 'High'),
                _buildLegendItem(AppTheme.danger, 'Extreme'),
              ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard(String title, String value, Color color, IconData icon) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.2),
            blurRadius: 8,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 20),
          const SizedBox(height: 4),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white70,
              fontSize: 11,
            ),
          ),
          const SizedBox(height: 2),
          Text(
            value,
            style: TextStyle(
              color: color,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildLegendItem(Color color, String label) {
    return Row(
      children: [
        Container(
          width: 12,
          height: 12,
          decoration: BoxDecoration(
            color: color,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(
                color: color,
                blurRadius: 4,
              ),
            ],
          ),
        ),
        const SizedBox(width: 8),
        Text(
          label,
          style: const TextStyle(color: Colors.white70, fontSize: 12),
        ),
      ],
    );
  }

  Marker _buildHeatMarker(double lat, double lng, double temp, Color color) {
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
