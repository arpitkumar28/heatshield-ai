import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/screens/heat_map_screen.dart';
import 'package:heatshield_mobile/screens/alerts_screen.dart';
import 'package:heatshield_mobile/screens/cooling_centers_screen.dart';
import 'package:heatshield_mobile/screens/analytics_screen.dart';
import 'package:heatshield_mobile/screens/profile_screen.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  int _selectedIndex = 0;

  final List<Widget> _screens = [
    const HeatMapScreen(),
    const AlertsScreen(),
    const CoolingCentersScreen(),
    const AnalyticsScreen(),
    const ProfileScreen(),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: _screens[_selectedIndex],
      bottomNavigationBar: Container(
        decoration: BoxDecoration(
          color: AppTheme.surface,
          border: Border(
            top: BorderSide(color: Colors.white.withOpacity(0.1)),
          ),
        ),
        child: BottomNavigationBar(
          currentIndex: _selectedIndex,
          onTap: (index) {
            setState(() {
              _selectedIndex = index;
            });
          },
          type: BottomNavigationBarType.fixed,
          selectedItemColor: AppTheme.primary,
          unselectedItemColor: Colors.grey,
          backgroundColor: Colors.transparent,
          elevation: 0,
          items: const [
            BottomNavigationBarItem(
              icon: Icon(Icons.map_outlined),
              activeIcon: Icon(Icons.map),
              label: 'Heat Map',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.warning_outlined),
              activeIcon: Icon(Icons.warning),
              label: 'Alerts',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.ac_unit_outlined),
              activeIcon: Icon(Icons.ac_unit),
              label: 'Cooling',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.bar_chart_outlined),
              activeIcon: Icon(Icons.bar_chart),
              label: 'Analytics',
            ),
            BottomNavigationBarItem(
              icon: Icon(Icons.person_outline),
              activeIcon: Icon(Icons.person),
              label: 'Profile',
            ),
          ],
        ),
      ),
    );
  }
}
