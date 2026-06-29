from datetime import datetime, timedelta

from app.models.location import CoolingCenter, HeatData, Location
from app.models.recommendation import HeatAlert, Recommendation


def seed_location(db):
    location = Location(
        name="Jaipur",
        latitude=26.9124,
        longitude=75.7873,
        location_type="city",
        population=3073350,
        area_sqkm=467.0,
    )
    db.add(location)
    db.commit()
    db.refresh(location)
    return location


def test_location_static_routes_are_not_captured_by_location_id(client, db):
    location = seed_location(db)
    heat_data = HeatData(
        location_id=location.id,
        timestamp=datetime.utcnow(),
        land_surface_temperature=43.5,
        heat_index=46.0,
        ndvi=0.18,
        heat_impact_score=0.91,
        vulnerability_score=0.76,
        is_hotspot=True,
    )
    center = CoolingCenter(
        name="City Cooling Hub",
        latitude=26.913,
        longitude=75.788,
        address="Civil Lines",
        capacity=250,
        current_occupancy=40,
        is_active=True,
    )
    db.add_all([heat_data, center])
    db.commit()

    hotspots = client.get("/api/v1/locations/hotspots")
    assert hotspots.status_code == 200
    assert hotspots.json()["hotspots"][0]["location_id"] == location.id

    centers = client.get(
        "/api/v1/locations/cooling-centers/nearby",
        params={"latitude": 26.9124, "longitude": 75.7873},
    )
    assert centers.status_code == 200


def test_analytics_routes_are_not_double_prefixed(client, db):
    location = seed_location(db)
    db.add(
        HeatData(
            location_id=location.id,
            timestamp=datetime.utcnow(),
            land_surface_temperature=41.2,
            heat_index=44.0,
            ndvi=0.22,
            heat_impact_score=0.84,
            vulnerability_score=0.68,
            is_hotspot=True,
        )
    )
    db.commit()

    trends = client.get(
        "/api/v1/analytics/heat-trends",
        params={"location_id": location.id, "days": 7},
    )
    assert trends.status_code == 200
    assert trends.json()["data_points"] == 1

    comparison = client.get(
        "/api/v1/analytics/location-comparison",
        params={"location_ids": [location.id]},
    )
    assert comparison.status_code == 200
    assert comparison.json()["comparison"][0]["location_id"] == location.id

    vulnerability = client.get("/api/v1/analytics/vulnerability-map")
    assert vulnerability.status_code == 200
    assert vulnerability.json()["vulnerability_data"][0]["location_id"] == location.id


def test_recommendation_and_alert_routes_are_under_recommendations_prefix(client, db):
    location = seed_location(db)
    db.add_all(
        [
            Recommendation(
                location_id=location.id,
                title="Cool Roof Coatings",
                description="Apply reflective coating to priority buildings",
                category="Infrastructure",
                priority="High",
                temperature_reduction=1.5,
                cost_estimate=3000000,
                ai_confidence=0.82,
            ),
            HeatAlert(
                location_id=location.id,
                alert_type="heatwave",
                severity="severe",
                title="Severe heat alert",
                message="High heat stress expected",
                start_time=datetime.utcnow(),
                end_time=datetime.utcnow() + timedelta(hours=8),
                heat_index=45.0,
                is_active=True,
            ),
        ]
    )
    db.commit()

    recommendations = client.get(f"/api/v1/recommendations/locations/{location.id}/recommendations")
    assert recommendations.status_code == 200
    assert recommendations.json()[0]["title"] == "Cool Roof Coatings"

    category = client.get("/api/v1/recommendations/category/Infrastructure")
    assert category.status_code == 200
    assert category.json()[0]["category"] == "Infrastructure"

    alerts = client.get("/api/v1/recommendations/heat-alerts", params={"location_id": location.id})
    assert alerts.status_code == 200
    assert alerts.json()[0]["title"] == "Severe heat alert"
