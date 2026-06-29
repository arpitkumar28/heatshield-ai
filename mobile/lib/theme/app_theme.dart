import 'package:flutter/material.dart';

class AppTheme {
  // Color Palette - Matching the web design
  static const Color primary = Color(0xFFFF6B35);
  static const Color secondary = Color(0xFF00D4FF);
  static const Color background = Color(0xFF050816);
  static const Color surface = Color(0xFF0B1220);
  static const Color card = Color(0xFF121A2B);
  static const Color success = Color(0xFF22C55E);
  static const Color warning = Color(0xFFF59E0B);
  static const Color danger = Color(0xFFEF4444);
  static const Color text = Color(0xFFFFFFFF);
  
  // Legacy ISRO colors for compatibility
  static const Color isroOrange = Color(0xFFFF6B35);
  static const Color isroBlue = Color(0xFF0066CC);
  static const Color isroDark = Color(0xFF0A0E27);
  static const Color isroLight = Color(0xFFE8F4F8);
  static const Color isroAccent = Color(0xFF00D4FF);

  static ThemeData get darkTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      colorScheme: const ColorScheme.dark(
        primary: primary,
        secondary: secondary,
        surface: surface,
        background: background,
        error: danger,
        success: success,
        warning: warning,
      ),
      scaffoldBackgroundColor: background,
      appBarTheme: const AppBarTheme(
        backgroundColor: surface,
        foregroundColor: text,
        elevation: 0,
        centerTitle: true,
      ),
      cardTheme: CardTheme(
        color: card,
        elevation: 0,
        shape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(16),
          side: BorderSide(color: Colors.white.withOpacity(0.1)),
        ),
      ),
      elevatedButtonTheme: ElevatedButtonThemeData(
        style: ElevatedButton.styleFrom(
          backgroundColor: primary,
          foregroundColor: text,
          elevation: 0,
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      outlinedButtonTheme: OutlinedButtonThemeData(
        style: OutlinedButton.styleFrom(
          foregroundColor: secondary,
          side: BorderSide(color: secondary.withOpacity(0.3)),
          padding: const EdgeInsets.symmetric(horizontal: 24, vertical: 12),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
      ),
      textButtonTheme: TextButtonThemeData(
        style: TextButton.styleFrom(
          foregroundColor: text,
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
        ),
      ),
      inputDecorationTheme: InputDecorationTheme(
        filled: true,
        fillColor: card,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
        ),
        enabledBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: BorderSide(color: Colors.white.withOpacity(0.1)),
        ),
        focusedBorder: OutlineInputBorder(
          borderRadius: BorderRadius.circular(12),
          borderSide: const BorderSide(color: primary),
        ),
      ),
      bottomNavigationBarTheme: const BottomNavigationBarThemeData(
        backgroundColor: surface,
        selectedItemColor: primary,
        unselectedItemColor: Colors.grey,
        type: BottomNavigationBarType.fixed,
        elevation: 0,
      ),
    );
  }
}
