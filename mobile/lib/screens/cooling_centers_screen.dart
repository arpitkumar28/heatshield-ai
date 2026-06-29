import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:geolocator/geolocator.dart';
import 'package:heatshield_mobile/models/cooling_center.dart';
import 'package:heatshield_mobile/providers/cooling_center_provider.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class CoolingCentersScreen extends ConsumerStatefulWidget {
  const CoolingCentersScreen({super.key});

  @override
  ConsumerState<CoolingCentersScreen> createState() => _CoolingCentersScreenState();
}

class _CoolingCentersScreenState extends ConsumerState<CoolingCentersScreen> {
  bool _isLoading = true;
  Position? _currentPosition;

  @override
  void initState() {
    super.initState();
    _getCurrentLocation();
  }

  Future<void> _getCurrentLocation() async {
    bool serviceEnabled;
    LocationPermission permission;

    serviceEnabled = await Geolocator.isLocationServiceEnabled();
    if (!serviceEnabled) {
      setState(() {
        _isLoading = false;
      });
      return;
    }

    permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        setState(() {
          _isLoading = false;
        });
        return;
      }
    }

    Position position = await Geolocator.getCurrentPosition(
      desiredAccuracy: LocationAccuracy.high,
    );

    setState(() {
      _currentPosition = position;
      _isLoading = false;
    });

    // Fetch cooling centers
    if (mounted) {
      ref.read(coolingCenterProvider.notifier).fetchNearbyCoolingCenters(
        position.latitude,
        position.longitude,
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final coolingCenterState = ref.watch(coolingCenterProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Cooling Centers'),
        backgroundColor: AppTheme.surface,
        foregroundColor: Colors.white,
        actions: [
          IconButton(
            icon: const Icon(Icons.near_me),
            onPressed: _isLoading ? null : _getCurrentLocation,
          ),
        ],
      ),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : coolingCenterState.isLoading
              ? const Center(child: CircularProgressIndicator())
              : coolingCenterState.error != null
                  ? Center(
                      child: Text(
                        'Error: ${coolingCenterState.error}',
                        style: const TextStyle(color: Colors.white70),
                      ),
                    )
                  : coolingCenterState.coolingCenters.isEmpty
                      ? Center(
                          child: Text(
                            'No cooling centers found nearby',
                            style: const TextStyle(color: Colors.white70),
                          ),
                        )
                      : ListView(
                          padding: const EdgeInsets.all(16),
                          children: coolingCenterState.coolingCenters
                              .map((center) => Padding(
                                    padding: const EdgeInsets.only(bottom: 12),
                                    child: _buildCoolingCenterCard(center),
                                  ))
                              .toList(),
                        ),
    );
  }

  Widget _buildCoolingCenterCard(CoolingCenter center) {
    final isOpen = center.currentOccupancy < center.capacity;
    final occupancyPercentage = center.occupancyPercentage;

    return Card(
      color: AppTheme.card,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(12),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Icon(
                  Icons.ac_unit,
                  color: isOpen ? AppTheme.success : Colors.grey,
                ),
                const SizedBox(width: 8),
                Expanded(
                  child: Text(
                    center.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 18,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                  decoration: BoxDecoration(
                    color: isOpen
                        ? AppTheme.success.withOpacity(0.2)
                        : Colors.grey.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                  ),
                  child: Text(
                    isOpen ? 'Open' : 'Closed',
                    style: TextStyle(
                      color: isOpen ? AppTheme.success : Colors.grey,
                      fontSize: 12,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text(
              center.address,
              style: const TextStyle(
                color: Colors.white70,
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(Icons.people, size: 16, color: Colors.white70),
                const SizedBox(width: 4),
                Text(
                  '${occupancyPercentage.toStringAsFixed(0)}% occupied',
                  style: const TextStyle(color: Colors.white70, fontSize: 12),
                ),
                const SizedBox(width: 16),
                const Icon(Icons.access_time, size: 16, color: Colors.white70),
                const SizedBox(width: 4),
                Text(
                  center.operatingHours,
                  style: const TextStyle(color: Colors.white70, fontSize: 12),
                ),
              ],
            ),
            const SizedBox(height: 12),
            Wrap(
              spacing: 8,
              children: center.facilities
                  .map((facility) => Chip(
                        label: Text(
                          facility,
                          style: const TextStyle(fontSize: 10),
                        ),
                        backgroundColor: AppTheme.secondary.withOpacity(0.3),
                        labelColor: Colors.white,
                      ))
                  .toList(),
            ),
          ],
        ),
      ),
    );
  }
}
