import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/providers/auth_provider.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);
    final user = authState.user;

    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Profile Header - Premium Design
          Container(
            decoration: BoxDecoration(
              gradient: LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [
                  AppTheme.primary.withOpacity(0.2),
                  AppTheme.secondary.withOpacity(0.2),
                ],
              ),
              borderRadius: BorderRadius.circular(20),
              border: Border.all(
                color: Colors.white.withOpacity(0.1),
              ),
            ),
            child: Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                children: [
                  Container(
                    decoration: BoxDecoration(
                      gradient: const LinearGradient(
                        begin: Alignment.topLeft,
                        end: Alignment.bottomRight,
                        colors: [AppTheme.primary, AppTheme.secondary],
                      ),
                      shape: BoxShape.circle,
                      boxShadow: [
                        BoxShadow(
                          color: AppTheme.primary.withOpacity(0.4),
                          blurRadius: 20,
                          spreadRadius: 4,
                        ),
                      ],
                    ),
                    child: const CircleAvatar(
                      radius: 50,
                      backgroundColor: Colors.transparent,
                      child: Icon(Icons.person, size: 50, color: Colors.white),
                    ),
                  ),
                  const SizedBox(height: 16),
                  Text(
                    user?.fullName ?? 'User',
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 24,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    user?.email ?? 'user@example.com',
                    style: TextStyle(
                      color: Colors.white.withOpacity(0.7),
                      fontSize: 14,
                    ),
                  ),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                    decoration: BoxDecoration(
                      color: AppTheme.success.withOpacity(0.2),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(color: AppTheme.success.withOpacity(0.5)),
                    ),
                    child: Row(
                      mainAxisSize: MainAxisSize.min,
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
                          'ISRO Partner',
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
            ),
          ),
          const SizedBox(height: 24),
          // Settings - Premium Design
          const Text(
            'Settings',
            style: TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 16),
          _buildSettingItem(
            icon: Icons.notifications_outlined,
            title: 'Notifications',
            subtitle: 'Manage push notifications',
            color: AppTheme.primary,
            onTap: () {},
          ),
          _buildSettingItem(
            icon: Icons.location_on_outlined,
            title: 'Location Services',
            subtitle: 'Enable location tracking',
            color: AppTheme.secondary,
            onTap: () {},
          ),
          _buildSettingItem(
            icon: Icons.language_outlined,
            title: 'Language',
            subtitle: 'English',
            color: AppTheme.success,
            onTap: () {},
          ),
          _buildSettingItem(
            icon: Icons.dark_mode_outlined,
            title: 'Appearance',
            subtitle: 'Dark mode',
            color: AppTheme.warning,
            onTap: () {},
          ),
          _buildSettingItem(
            icon: Icons.info_outline,
            title: 'About',
            subtitle: 'HeatShield AI v1.0.0',
            color: AppTheme.danger,
            onTap: () {},
          ),
          const SizedBox(height: 24),
          // Logout Button - Premium Design
          Container(
            width: double.infinity,
            decoration: BoxDecoration(
              gradient: const LinearGradient(
                begin: Alignment.topLeft,
                end: Alignment.bottomRight,
                colors: [AppTheme.primary, Color(0xFFFF8C5A)],
              ),
              borderRadius: BorderRadius.circular(16),
              boxShadow: [
                BoxShadow(
                  color: AppTheme.primary.withOpacity(0.4),
                  blurRadius: 12,
                  offset: const Offset(0, 4),
                ),
              ],
            ),
            child: ElevatedButton(
              onPressed: () => ref.read(authProvider.notifier).logout(),
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.transparent,
                shadowColor: Colors.transparent,
                padding: const EdgeInsets.symmetric(vertical: 16),
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(16),
                ),
              ),
              child: const Text(
                'Logout',
                style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold),
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSettingItem({
    required IconData icon,
    required String title,
    required String subtitle,
    required Color color,
    required VoidCallback onTap,
  }) {
    return Container(
      margin: const EdgeInsets.only(bottom: 12),
      decoration: BoxDecoration(
        color: AppTheme.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: ListTile(
        leading: Container(
          padding: const EdgeInsets.all(10),
          decoration: BoxDecoration(
            color: color.withOpacity(0.2),
            borderRadius: BorderRadius.circular(12),
          ),
          child: Icon(icon, color: color),
        ),
        title: Text(
          title,
          style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w500),
        ),
        subtitle: Text(
          subtitle,
          style: TextStyle(color: Colors.white.withOpacity(0.6)),
        ),
        trailing: const Icon(Icons.chevron_right, color: Colors.white38),
        onTap: onTap,
      ),
    );
  }
}
