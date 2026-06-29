import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/providers/auth_provider.dart';
import 'package:heatshield_mobile/screens/home_screen.dart';
import 'package:heatshield_mobile/screens/login_screen.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

void main() {
  runApp(const ProviderScope(child: HeatShieldApp()));
}

class HeatShieldApp extends ConsumerWidget {
  const HeatShieldApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final authState = ref.watch(authProvider);

    return MaterialApp(
      title: 'HeatShield AI',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.darkTheme,
      home: authState.isAuthenticated ? const HomeScreen() : const LoginScreen(),
    );
  }
}
