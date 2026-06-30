from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from typing import AsyncGenerator
import asyncio
import json
from datetime import datetime
import random

router = APIRouter()


async def heat_data_generator() -> AsyncGenerator[str, None]:
    """
    Generator for Server-Sent Events for heat data
    """
    while True:
        data = {
            "type": "heat_data",
            "timestamp": datetime.now().isoformat(),
            "data": {
                "temperature": round(random.uniform(35, 45), 1),
                "heat_index": round(random.uniform(40, 52), 1),
                "humidity": round(random.uniform(30, 70), 1),
                "ndvi": round(random.uniform(0.2, 0.6), 2),
                "hotspots": random.randint(0, 10)
            }
        }
        yield f"data: {json.dumps(data)}\n\n"
        await asyncio.sleep(5)


async def alerts_generator() -> AsyncGenerator[str, None]:
    """
    Generator for Server-Sent Events for alerts
    """
    while True:
        # Only send alerts randomly (10% chance)
        if random.random() < 0.1:
            alert_types = ["critical", "high", "medium", "low"]
            data = {
                "type": "alert",
                "timestamp": datetime.now().isoformat(),
                "data": {
                    "id": random.randint(1000, 9999),
                    "type": random.choice(alert_types),
                    "title": f"Heat Alert: {'Delhi' if random.random() > 0.5 else 'Mumbai'}",
                    "description": "Temperature exceeding safe limits",
                    "location": random.choice(["Delhi NCR", "Mumbai", "Chennai", "Kolkata"]),
                    "temperature": round(random.uniform(42, 48), 1),
                    "acknowledged": False
                }
            }
            yield f"data: {json.dumps(data)}\n\n"
        
        await asyncio.sleep(3)


async def dashboard_metrics_generator() -> AsyncGenerator[str, None]:
    """
    Generator for Server-Sent Events for dashboard metrics
    """
    while True:
        data = {
            "type": "dashboard_metrics",
            "timestamp": datetime.now().isoformat(),
            "data": {
                "current_temperature": round(random.uniform(40, 45), 1),
                "heat_index": round(random.uniform(45, 50), 1),
                "active_hotspots": random.randint(15, 30),
                "vulnerable_population": f"{random.randint(2, 3)}.{random.randint(0, 9)}M",
                "cooling_centers": random.randint(150, 170),
                "active_alerts": random.randint(5, 15)
            }
        }
        yield f"data: {json.dumps(data)}\n\n"
        await asyncio.sleep(10)


@router.get("/heat-data")
async def heat_data_sse():
    """
    SSE endpoint for real-time heat data
    """
    return StreamingResponse(
        heat_data_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


@router.get("/alerts")
async def alerts_sse():
    """
    SSE endpoint for real-time alerts
    """
    return StreamingResponse(
        alerts_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )


@router.get("/dashboard-metrics")
async def dashboard_metrics_sse():
    """
    SSE endpoint for real-time dashboard metrics
    """
    return StreamingResponse(
        dashboard_metrics_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"
        }
    )
