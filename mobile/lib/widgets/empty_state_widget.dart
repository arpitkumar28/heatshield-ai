import 'package:flutter/material.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class EmptyStateWidget extends StatelessWidget {
  final String title;
  final String? subtitle;
  final IconData icon;
  final VoidCallback? onAction;
  final String? actionLabel;

  const EmptyStateWidget({
    super.key,
    required this.title,
    this.subtitle,
    required this.icon,
    this.onAction,
    this.actionLabel,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            icon,
            size: 64,
            color: Colors.white.withOpacity(0.3),
          ),
          const SizedBox(height: 16),
          Text(
            title,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.white,
              fontSize: 18,
              fontWeight: FontWeight.bold,
            ),
          ),
          if (subtitle != null) ...[
            const SizedBox(height: 8),
            Text(
              subtitle!,
              textAlign: TextAlign.center,
              style: TextStyle(
                color: Colors.white.withOpacity(0.7),
                fontSize: 14,
              ),
            ),
          ],
          if (onAction != null && actionLabel != null) ...[
            const SizedBox(height: 24),
            ElevatedButton(
              onPressed: onAction,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primary,
              ),
              child: Text(actionLabel!),
            ),
          ],
        ],
      ),
    );
  }
}
