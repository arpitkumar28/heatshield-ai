"""
Seed Data Script for HeatShield AI
Populates database with initial data for Jaipur, Delhi, Ahmedabad, Hyderabad
"""
from sqlalchemy.orm import Session
from app.core.database import SessionLocal, engine, Base
from app.models.location import Location, HeatData
from app.models.recommendation import Recommendation
from datetime import datetime, timedelta
import random

def seed_data():
    """Seed the database with initial data"""
    # Create tables
    Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    
    try:
        # Clear existing data
        db.query(HeatData).delete()
        db.query(Location).delete()
        db.query(Recommendation).delete()
        db.commit()
        
        # City data with coordinates
        cities = [
            {
                "name": "Jaipur",
                "latitude": 26.9124,
                "longitude": 75.7873,
                "location_type": "city",
                "population": 3500000,
                "area_sqkm": 467,
                "base_temp": 41.2,
                "base_ndvi": 0.35
            },
            {
                "name": "Delhi",
                "latitude": 28.6139,
                "longitude": 77.2090,
                "location_type": "city",
                "population": 19000000,
                "area_sqkm": 1484,
                "base_temp": 40.5,
                "base_ndvi": 0.32
            },
            {
                "name": "Ahmedabad",
                "latitude": 23.0225,
                "longitude": 72.5714,
                "location_type": "city",
                "population": 8700000,
                "area_sqkm": 464,
                "base_temp": 42.1,
                "base_ndvi": 0.28
            },
            {
                "name": "Hyderabad",
                "latitude": 17.3850,
                "longitude": 78.4867,
                "location_type": "city",
                "population": 9700000,
                "area_sqkm": 650,
                "base_temp": 38.9,
                "base_ndvi": 0.40
            }
        ]
        
        # Create locations and heat data
        for city_data in cities:
            location = Location(
                name=city_data["name"],
                latitude=city_data["latitude"],
                longitude=city_data["longitude"],
                location_type=city_data["location_type"],
                population=city_data["population"],
                area_sqkm=city_data["area_sqkm"],
                extra_data={"country": "India"}
            )
            db.add(location)
            db.flush()
            
            # Generate heat data for the last 30 days
            base_temp = city_data["base_temp"]
            base_ndvi = city_data["base_ndvi"]
            
            for day in range(30):
                timestamp = datetime.utcnow() - timedelta(days=day)
                
                # Add some variation to temperature
                temp_variation = random.uniform(-3, 3)
                lst = base_temp + temp_variation
                
                # Calculate heat index (simplified)
                heat_index = lst + random.uniform(2, 5)
                
                # NDVI variation
                ndvi = max(0, min(1, base_ndvi + random.uniform(-0.1, 0.1)))
                
                # Determine if hotspot based on temperature
                is_hotspot = lst > 40
                
                # Calculate heat impact score
                heat_impact_score = (lst / 50) * 0.6 + (1 - ndvi) * 0.4
                
                # Calculate vulnerability score
                vulnerability_score = heat_impact_score * 0.7 + (city_data["population"] / 20000000) * 0.3
                
                heat_data = HeatData(
                    location_id=location.id,
                    timestamp=timestamp,
                    land_surface_temperature=round(lst, 2),
                    air_temperature=round(lst - 2, 2),
                    heat_index=round(heat_index, 2),
                    ndvi=round(ndvi, 4),
                    ndwi=random.uniform(-0.3, 0.5),
                    albedo=random.uniform(0.1, 0.4),
                    emissivity=random.uniform(0.9, 0.99),
                    urban_density=random.uniform(0.5, 0.9),
                    impervious_surface=random.uniform(0.4, 0.8),
                    building_height_avg=random.uniform(10, 40),
                    heat_impact_score=round(heat_impact_score, 3),
                    vulnerability_score=round(vulnerability_score, 3),
                    is_hotspot=is_hotspot,
                    predicted_lst=round(lst + random.uniform(-1, 1), 2),
                    prediction_confidence=random.uniform(0.7, 0.95)
                )
                db.add(heat_data)
            
            print(f"Created location: {city_data['name']} with 30 days of heat data")
        
        # Create recommendations (assign to first location for simplicity)
        first_location = db.query(Location).first()
        
        recommendations_data = [
            {
                "title": "Plant Urban Trees",
                "category": "Vegetation",
                "description": "Increase green cover by planting native tree species in urban areas to provide shade and reduce surface temperatures.",
                "ai_confidence": 0.9,
                "cost_estimate": 5000000,  # 50 Lakhs in INR
                "temperature_reduction": 2.5,
                "priority": "High"
            },
            {
                "title": "Cool Roof Coatings",
                "category": "Infrastructure",
                "description": "Apply reflective white coatings to rooftops to reduce heat absorption and lower indoor temperatures.",
                "ai_confidence": 0.8,
                "cost_estimate": 3000000,  # 30 Lakhs in INR
                "temperature_reduction": 1.5,
                "priority": "Medium"
            },
            {
                "title": "Reflective Pavements",
                "category": "Infrastructure",
                "description": "Install reflective pavement materials to reduce urban heat island effect and surface temperatures.",
                "ai_confidence": 0.7,
                "cost_estimate": 4000000,  # 40 Lakhs in INR
                "temperature_reduction": 0.75,
                "priority": "Medium"
            },
            {
                "title": "Water Bodies Restoration",
                "category": "Infrastructure",
                "description": "Restore and create urban water bodies, lakes, and fountains for natural cooling through evaporation.",
                "ai_confidence": 0.85,
                "cost_estimate": 7500000,  # 75 Lakhs in INR
                "temperature_reduction": 2.0,
                "priority": "High"
            },
            {
                "title": "Green Walls and Facades",
                "category": "Vegetation",
                "description": "Install vertical gardens on building exteriors to reduce heat absorption and improve air quality.",
                "ai_confidence": 0.75,
                "cost_estimate": 6000000,  # 60 Lakhs in INR
                "temperature_reduction": 1.5,
                "priority": "Medium"
            },
            {
                "title": "Urban Forest Development",
                "category": "Vegetation",
                "description": "Develop dense urban forests in peri-urban areas to create cooling corridors and biodiversity hubs.",
                "ai_confidence": 0.95,
                "cost_estimate": 10000000,  # 100 Lakhs in INR
                "temperature_reduction": 3.5,
                "priority": "High"
            },
            {
                "title": "Cool Pavements with Permeable Materials",
                "category": "Infrastructure",
                "description": "Replace asphalt with permeable materials that allow water infiltration and reduce heat retention.",
                "ai_confidence": 0.65,
                "cost_estimate": 4500000,  # 45 Lakhs in INR
                "temperature_reduction": 0.75,
                "priority": "Low"
            },
            {
                "title": "Shade Structures Installation",
                "category": "Infrastructure",
                "description": "Install shade structures at bus stops, public spaces, and pedestrian pathways to provide immediate relief.",
                "ai_confidence": 0.6,
                "cost_estimate": 2500000,  # 25 Lakhs in INR
                "temperature_reduction": 1.25,
                "priority": "Medium"
            }
        ]
        
        for rec_data in recommendations_data:
            recommendation = Recommendation(
                location_id=first_location.id if first_location else 1,
                title=rec_data["title"],
                category=rec_data["category"],
                description=rec_data["description"],
                ai_confidence=rec_data["ai_confidence"],
                cost_estimate=rec_data["cost_estimate"],
                temperature_reduction=rec_data["temperature_reduction"],
                priority=rec_data["priority"],
                status="proposed",
                implementation_time="6-12 months",
                benefit_cost_ratio=rec_data["temperature_reduction"] / (rec_data["cost_estimate"] / 1000000)  # Simple ratio
            )
            db.add(recommendation)
        
        db.commit()
        print(f"Created {len(recommendations_data)} recommendations")
        print("\n✅ Seed data created successfully!")
        print("Cities: Jaipur, Delhi, Ahmedabad, Hyderabad")
        print("Heat Data Points: 120 (30 days × 4 cities)")
        print(f"Recommendations: {len(recommendations_data)}")
        
    except Exception as e:
        db.rollback()
        print(f"❌ Error seeding data: {e}")
        raise
    finally:
        db.close()

if __name__ == "__main__":
    seed_data()
