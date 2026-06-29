import 'package:flutter/material.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class ErrorWidget extends StatelessWidget {
  final String message;
  final VoidCallback? onRetry;

  const ErrorWidget({
    super.key,
    required this.message,
    this.onRetry,
  });

  @override
  Widget build(BuildContext context) {
    return Center(
      padding: const EdgeInsets.all(24),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.error_outline,
            size: 64,
            color: AppTheme.danger,
          ),
          const SizedBox(height: 16),
          Text(
            message,
            textAlign: TextAlign.center,
            style: const TextStyle(color: Colors.white70),
          ),
          if (onRetry != null) ...[
            const SizedBox(height: 16),
            ElevatedButton(
              onPressed: onRetry,
              style: ElevatedButton.styleFrom(
                backgroundColor: AppTheme.primary,
              ),
              child: const Text('Retry'),
            ),
          ],
        ],
      ),
    );
  }
}
