import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:heatshield_mobile/models/heat_alert.dart';
import 'package:heatshield_mobile/providers/alert_provider.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class AlertsScreen extends ConsumerStatefulWidget {
  const AlertsScreen({super.key});

  @override
  ConsumerState<AlertsScreen> createState() => _AlertsScreenState();
}

class _AlertsScreenState extends ConsumerState<AlertsScreen> {
  @override
  void initState() {
    super.initState();
    ref.read(alertProvider.notifier).fetchAlerts();
  }

  @override
  Widget build(BuildContext context) {
    final alertState = ref.watch(alertProvider);

    return Scaffold(
      appBar: AppBar(
        title: const Text('Alert Center'),
        actions: [
          IconButton(
            icon: const Icon(Icons.filter_list),
            onPressed: () {},
          ),
        ],
      ),
      body: alertState.isLoading
          ? const Center(child: CircularProgressIndicator())
          : alertState.error != null
              ? Center(
                  child: Text(
                    'Error: ${alertState.error}',
                    style: const TextStyle(color: Colors.white70),
                  ),
                )
              : alertState.alerts.isEmpty
                  ? const Center(
                      child: Text(
                        'No active alerts',
                        style: TextStyle(color: Colors.white70),
                      ),
                    )
                  : ListView(
                      padding: const EdgeInsets.all(16),
                      children: [
                        // Alert Summary Cards
                        Row(
                          children: [
                            Expanded(
                              child: _buildSummaryCard(
                                'Critical',
                                alertState.alerts
                                    .where((a) => a.severity == 'critical')
                                    .length
                                    .toString(),
                                AppTheme.danger,
                                Icons.warning,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _buildSummaryCard(
                                'High',
                                alertState.alerts
                                    .where((a) => a.severity == 'high')
                                    .length
                                    .toString(),
                                AppTheme.warning,
                                Icons.info,
                              ),
                            ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: _buildSummaryCard(
                                'Medium',
                                alertState.alerts
                                    .where((a) => a.severity == 'medium')
                                    .length
                                    .toString(),
                                AppTheme.secondary,
                                Icons.notifications,
                              ),
                            ),
                          ],
                        ),
                        const SizedBox(height: 20),
                        // Alert Timeline
                        const Text(
                          'Recent Alerts',
                          style: TextStyle(
                            color: Colors.white,
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                          ),
                        ),
                        const SizedBox(height: 16),
                        ...alertState.alerts.map((alert) => Padding(
                              padding: const EdgeInsets.only(bottom: 12),
                              child: _buildAlertCard(alert),
                            )),
                      ],
                    ),
    );
  }

  Widget _buildSummaryCard(String label, String count, Color color, IconData icon) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        color: color.withOpacity(0.1),
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: color.withOpacity(0.3)),
      ),
      child: Column(
        children: [
          Icon(icon, color: color, size: 24),
          const SizedBox(height: 8),
          Text(
            count,
            style: TextStyle(
              color: color,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            label,
            style: const TextStyle(
              color: Colors.white70,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildAlertCard(HeatAlert alert) {
    final color = _getSeverityColor(alert.severity);
    final timeAgo = _getTimeAgo(alert.startTime);

    return Container(
      decoration: BoxDecoration(
        color: AppTheme.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(
          color: color.withOpacity(0.5),
          width: 2,
        ),
        boxShadow: [
          BoxShadow(
            color: color.withOpacity(0.2),
            blurRadius: 12,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: color.withOpacity(0.2),
                    borderRadius: BorderRadius.circular(8),
                    border: Border.all(color: color.withOpacity(0.5)),
                  ),
                  child: Text(
                    alert.severityDisplay,
                    style: TextStyle(
                      color: color,
                      fontWeight: FontWeight.bold,
                      fontSize: 11,
                    ),
                  ),
                ),
                const Spacer(),
                Row(
                  children: [
                    const Icon(Icons.access_time, size: 14, color: Colors.white54),
                    const SizedBox(width: 4),
                    Text(
                      timeAgo,
                      style: const TextStyle(
                        color: Colors.white54,
                        fontSize: 12,
                      ),
                    ),
                  ],
                ),
              ],
            ),
            const SizedBox(height: 12),
            Text(
              alert.title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 8),
            Text(
              alert.message,
              style: const TextStyle(
                color: Colors.white70,
                fontSize: 14,
              ),
            ),
            const SizedBox(height: 12),
            Row(
              children: [
                const Icon(Icons.location_on, size: 14, color: AppTheme.secondary),
                const SizedBox(width: 4),
                Text(
                  alert.areaDescription,
                  style: const TextStyle(
                    color: AppTheme.secondary,
                    fontSize: 12,
                    fontWeight: FontWeight.w500,
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }

  Color _getSeverityColor(String severity) {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'extreme':
        return AppTheme.danger;
      case 'high':
        return AppTheme.warning;
      case 'medium':
        return AppTheme.secondary;
      default:
        return AppTheme.success;
    }
  }

  String _getTimeAgo(DateTime dateTime) {
    final now = DateTime.now();
    final difference = now.difference(dateTime);

    if (difference.inHours < 1) {
      return '${difference.inMinutes} minutes ago';
    } else if (difference.inHours < 24) {
      return '${difference.inHours} hours ago';
    } else {
      return '${difference.inDays} days ago';
    }
  }
}
