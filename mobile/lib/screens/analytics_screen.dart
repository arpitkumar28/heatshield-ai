import 'package:flutter/material.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:heatshield_mobile/theme/app_theme.dart';

class AnalyticsScreen extends StatefulWidget {
  const AnalyticsScreen({super.key});

  @override
  State<AnalyticsScreen> createState() => _AnalyticsScreenState();
}

class _AnalyticsScreenState extends State<AnalyticsScreen> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Analytics'),
        actions: [
          IconButton(
            icon: const Icon(Icons.calendar_today),
            onPressed: () {},
          ),
        ],
      ),
      body: ListView(
        padding: const EdgeInsets.all(16),
        children: [
          // Summary Cards
          Row(
            children: [
              Expanded(
                child: _buildSummaryCard(
                  'Avg Temperature',
                  '38.5°C',
                  AppTheme.primary,
                  Icons.thermostat,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildSummaryCard(
                  'Heat Index',
                  '42.1°C',
                  AppTheme.danger,
                  Icons.whatshot,
                ),
              ),
            ],
          ),
          const SizedBox(height: 16),
          Row(
            children: [
              Expanded(
                child: _buildSummaryCard(
                  'NDVI',
                  '0.35',
                  AppTheme.success,
                  Icons.eco,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildSummaryCard(
                  'Hotspots',
                  '12',
                  AppTheme.warning,
                  Icons.location_on,
                ),
              ),
            ],
          ),
          const SizedBox(height: 24),
          // Temperature Trend Chart
          _buildChartCard(
            'Temperature Trend (7 Days)',
            _buildTemperatureChart(),
          ),
          const SizedBox(height: 16),
          // Heat Index Chart
          _buildChartCard(
            'Heat Index vs Temperature',
            _buildHeatIndexChart(),
          ),
          const SizedBox(height: 16),
          // NDVI Trend
          _buildChartCard(
            'Vegetation Index (NDVI)',
            _buildNDVIChart(),
          ),
          const SizedBox(height: 16),
          // Location Comparison
          _buildLocationComparison(),
        ],
      ),
    );
  }

  Widget _buildSummaryCard(String title, String value, Color color, IconData icon) {
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
            value,
            style: TextStyle(
              color: color,
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            title,
            style: const TextStyle(
              color: Colors.white70,
              fontSize: 12,
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChartCard(String title, Widget chart) {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              title,
              style: const TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            SizedBox(
              height: 200,
              child: chart,
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildTemperatureChart() {
    return LineChart(
      LineChartData(
        gridData: FlGridData(
          show: true,
          drawVerticalLine: false,
          horizontalInterval: 5,
          getDrawingHorizontalLine: (value) {
            return FlLine(
              color: Colors.white.withOpacity(0.1),
              strokeWidth: 1,
            );
          },
        ),
        titlesData: FlTitlesData(
          show: true,
          rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                if (value.toInt() >= 0 && value.toInt() < days.length) {
                  return Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Text(
                      days[value.toInt()],
                      style: const TextStyle(color: Colors.white70, fontSize: 10),
                    ),
                  );
                }
                return const Text('');
              },
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              interval: 5,
              getTitlesWidget: (value, meta) {
                return Text(
                  '${value.toInt()}°',
                  style: const TextStyle(color: Colors.white70, fontSize: 10),
                );
              },
            ),
          ),
        ),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            spots: const [
              FlSpot(0, 35),
              FlSpot(1, 37),
              FlSpot(2, 38),
              FlSpot(3, 40),
              FlSpot(4, 39),
              FlSpot(5, 41),
              FlSpot(6, 38),
            ],
            isCurved: true,
            gradient: const LinearGradient(
              colors: [AppTheme.primary, AppTheme.secondary],
            ),
            barWidth: 3,
            isStrokeCapRound: true,
            dotData: const FlDotData(show: false),
            belowBarData: BarAreaData(
              show: true,
              gradient: LinearGradient(
                colors: [
                  AppTheme.primary.withOpacity(0.3),
                  AppTheme.secondary.withOpacity(0.1),
                ],
                begin: Alignment.topCenter,
                end: Alignment.bottomCenter,
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildHeatIndexChart() {
    return LineChart(
      LineChartData(
        gridData: FlGridData(
          show: true,
          drawVerticalLine: false,
          horizontalInterval: 5,
          getDrawingHorizontalLine: (value) {
            return FlLine(
              color: Colors.white.withOpacity(0.1),
              strokeWidth: 1,
            );
          },
        ),
        titlesData: FlTitlesData(
          show: true,
          rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                if (value.toInt() >= 0 && value.toInt() < days.length) {
                  return Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Text(
                      days[value.toInt()],
                      style: const TextStyle(color: Colors.white70, fontSize: 10),
                    ),
                  );
                }
                return const Text('');
              },
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              interval: 5,
              getTitlesWidget: (value, meta) {
                return Text(
                  '${value.toInt()}°',
                  style: const TextStyle(color: Colors.white70, fontSize: 10),
                );
              },
            ),
          ),
        ),
        borderData: FlBorderData(show: false),
        lineBarsData: [
          LineChartBarData(
            spots: const [
              FlSpot(0, 38),
              FlSpot(1, 40),
              FlSpot(2, 42),
              FlSpot(3, 45),
              FlSpot(4, 43),
              FlSpot(5, 46),
              FlSpot(6, 42),
            ],
            isCurved: true,
            color: AppTheme.danger,
            barWidth: 3,
            isStrokeCapRound: true,
            dotData: const FlDotData(show: false),
          ),
          LineChartBarData(
            spots: const [
              FlSpot(0, 35),
              FlSpot(1, 37),
              FlSpot(2, 38),
              FlSpot(3, 40),
              FlSpot(4, 39),
              FlSpot(5, 41),
              FlSpot(6, 38),
            ],
            isCurved: true,
            color: AppTheme.primary,
            barWidth: 3,
            isStrokeCapRound: true,
            dotData: const FlDotData(show: false),
          ),
        ],
      ),
    );
  }

  Widget _buildNDVIChart() {
    return BarChart(
      BarChartData(
        gridData: FlGridData(
          show: true,
          drawVerticalLine: false,
          horizontalInterval: 0.1,
          getDrawingHorizontalLine: (value) {
            return FlLine(
              color: Colors.white.withOpacity(0.1),
              strokeWidth: 1,
            );
          },
        ),
        titlesData: FlTitlesData(
          show: true,
          rightTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          topTitles: const AxisTitles(sideTitles: SideTitles(showTitles: false)),
          bottomTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              getTitlesWidget: (value, meta) {
                const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                if (value.toInt() >= 0 && value.toInt() < days.length) {
                  return Padding(
                    padding: const EdgeInsets.only(top: 8.0),
                    child: Text(
                      days[value.toInt()],
                      style: const TextStyle(color: Colors.white70, fontSize: 10),
                    ),
                  );
                }
                return const Text('');
              },
            ),
          ),
          leftTitles: AxisTitles(
            sideTitles: SideTitles(
              showTitles: true,
              interval: 0.1,
              getTitlesWidget: (value, meta) {
                return Text(
                  value.toStringAsFixed(1),
                  style: const TextStyle(color: Colors.white70, fontSize: 10),
                );
              },
            ),
          ),
        ),
        borderData: FlBorderData(show: false),
        barGroups: [
          BarChartGroupData(
            x: 0,
            barRods: [
              BarChartRodData(
                toY: 0.4,
                color: AppTheme.success,
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          ),
          BarChartGroupData(
            x: 1,
            barRods: [
              BarChartRodData(
                toY: 0.38,
                color: AppTheme.success,
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          ),
          BarChartGroupData(
            x: 2,
            barRods: [
              BarChartRodData(
                toY: 0.35,
                color: AppTheme.warning,
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          ),
          BarChartGroupData(
            x: 3,
            barRods: [
              BarChartRodData(
                toY: 0.33,
                color: AppTheme.warning,
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          ),
          BarChartGroupData(
            x: 4,
            barRods: [
              BarChartRodData(
                toY: 0.36,
                color: AppTheme.success,
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          ),
          BarChartGroupData(
            x: 5,
            barRods: [
              BarChartRodData(
                toY: 0.34,
                color: AppTheme.warning,
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          ),
          BarChartGroupData(
            x: 6,
            barRods: [
              BarChartRodData(
                toY: 0.35,
                color: AppTheme.warning,
                width: 16,
                borderRadius: BorderRadius.circular(4),
              ),
            ],
          ),
        ],
      ),
    );
  }

  Widget _buildLocationComparison() {
    return Container(
      decoration: BoxDecoration(
        color: AppTheme.card,
        borderRadius: BorderRadius.circular(16),
        border: Border.all(color: Colors.white.withOpacity(0.1)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Location Comparison',
              style: TextStyle(
                color: Colors.white,
                fontSize: 16,
                fontWeight: FontWeight.bold,
              ),
            ),
            const SizedBox(height: 16),
            _buildLocationBar('Delhi', 45, AppTheme.danger),
            const SizedBox(height: 12),
            _buildLocationBar('Mumbai', 38, AppTheme.warning),
            const SizedBox(height: 12),
            _buildLocationBar('Bangalore', 32, AppTheme.success),
            const SizedBox(height: 12),
            _buildLocationBar('Chennai', 40, AppTheme.primary),
          ],
        ),
      ),
    );
  }

  Widget _buildLocationBar(String location, double temp, Color color) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(
              location,
              style: const TextStyle(color: Colors.white, fontSize: 14),
            ),
            Text(
              '${temp.toInt()}°C',
              style: TextStyle(color: color, fontSize: 14, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(height: 8),
        ClipRRect(
          borderRadius: BorderRadius.circular(8),
          child: LinearProgressIndicator(
            value: temp / 50,
            backgroundColor: Colors.white.withOpacity(0.1),
            valueColor: AlwaysStoppedAnimation<Color>(color),
            minHeight: 8,
          ),
        ),
      ],
    );
  }
}
