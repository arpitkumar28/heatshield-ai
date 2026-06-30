from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from typing import List, Dict
import json
import asyncio
from datetime import datetime
import random

router = APIRouter()

# Connection manager for WebSocket connections
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []
        self.client_data: Dict[WebSocket, dict] = {}
    
    async def connect(self, websocket: WebSocket, client_id: str):
        await websocket.accept()
        self.active_connections.append(websocket)
        self.client_data[websocket] = {
            "client_id": client_id,
            "connected_at": datetime.now().isoformat(),
            "subscriptions": []
        }
    
    def disconnect(self, websocket: WebSocket):
        if websocket in self.active_connections:
            self.active_connections.remove(websocket)
        if websocket in self.client_data:
            del self.client_data[websocket]
    
    async def send_personal_message(self, message: dict, websocket: WebSocket):
        try:
            await websocket.send_json(message)
        except:
            self.disconnect(websocket)
    
    async def broadcast(self, message: dict):
        disconnected = []
        for connection in self.active_connections:
            try:
                await connection.send_json(message)
            except:
                disconnected.append(connection)
        
        for connection in disconnected:
            self.disconnect(connection)
    
    async def broadcast_to_subscribers(self, message: dict, subscription: str):
        disconnected = []
        for connection in self.active_connections:
            client_info = self.client_data.get(connection, {})
            if subscription in client_info.get("subscriptions", []):
                try:
                    await connection.send_json(message)
                except:
                    disconnected.append(connection)
        
        for connection in disconnected:
            self.disconnect(connection)

manager = ConnectionManager()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket, client_id: str = "anonymous"):
    """
    Main WebSocket endpoint for real-time updates
    """
    await manager.connect(websocket, client_id)
    
    try:
        # Send welcome message
        await manager.send_personal_message({
            "type": "connection",
            "status": "connected",
            "client_id": client_id,
            "timestamp": datetime.now().isoformat()
        }, websocket)
        
        # Keep connection alive and handle messages
        while True:
            data = await websocket.receive_text()
            message = json.loads(data)
            
            # Handle different message types
            if message.get("type") == "subscribe":
                subscriptions = message.get("subscriptions", [])
                if websocket in manager.client_data:
                    manager.client_data[websocket]["subscriptions"] = subscriptions
                    await manager.send_personal_message({
                        "type": "subscription_confirmed",
                        "subscriptions": subscriptions,
                        "timestamp": datetime.now().isoformat()
                    }, websocket)
            
            elif message.get("type") == "ping":
                await manager.send_personal_message({
                    "type": "pong",
                    "timestamp": datetime.now().isoformat()
                }, websocket)
            
            elif message.get("type") == "get_status":
                await manager.send_personal_message({
                    "type": "status",
                    "active_connections": len(manager.active_connections),
                    "timestamp": datetime.now().isoformat()
                }, websocket)
    
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"Client {client_id} disconnected")


@router.websocket("/ws/heat-data")
async def heat_data_websocket(websocket: WebSocket, city: str = "all"):
    """
    WebSocket endpoint for real-time heat data streaming
    """
    await manager.connect(websocket, f"heat_data_{city}")
    
    try:
        while True:
            # Simulate real-time heat data
            heat_data = {
                "type": "heat_data",
                "city": city,
                "timestamp": datetime.now().isoformat(),
                "data": {
                    "temperature": round(random.uniform(35, 45), 1),
                    "heat_index": round(random.uniform(40, 52), 1),
                    "humidity": round(random.uniform(30, 70), 1),
                    "ndvi": round(random.uniform(0.2, 0.6), 2),
                    "hotspots": random.randint(0, 10)
                }
            }
            
            await manager.send_personal_message(heat_data, websocket)
            
            # Send updates every 5 seconds
            await asyncio.sleep(5)
    
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print(f"Heat data client for {city} disconnected")


@router.websocket("/ws/alerts")
async def alerts_websocket(websocket: WebSocket):
    """
    WebSocket endpoint for real-time alert notifications
    """
    await manager.connect(websocket, "alerts_client")
    
    try:
        while True:
            # Simulate random alerts
            if random.random() < 0.1:  # 10% chance of alert
                alert_types = ["critical", "high", "medium", "low"]
                alert = {
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
                
                await manager.send_personal_message(alert, websocket)
            
            await asyncio.sleep(3)
    
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        print("Alerts client disconnected")


@router.post("/broadcast")
async def broadcast_message(message: dict):
    """
    Broadcast a message to all connected WebSocket clients
    """
    await manager.broadcast({
        "type": "broadcast",
        "data": message,
        "timestamp": datetime.now().isoformat()
    })
    
    return {"status": "broadcasted", "connections": len(manager.active_connections)}


@router.post("/broadcast/{subscription}")
async def broadcast_to_subscription(subscription: str, message: dict):
    """
    Broadcast a message to clients subscribed to a specific topic
    """
    await manager.broadcast_to_subscribers({
        "type": "subscription_broadcast",
        "subscription": subscription,
        "data": message,
        "timestamp": datetime.now().isoformat()
    }, subscription)
    
    return {"status": "broadcasted", "subscription": subscription}


@router.get("/connections")
async def get_connections():
    """
    Get information about active WebSocket connections
    """
    connections_info = []
    for connection, data in manager.client_data.items():
        connections_info.append({
            "client_id": data["client_id"],
            "connected_at": data["connected_at"],
            "subscriptions": data["subscriptions"]
        })
    
    return {
        "active_connections": len(manager.active_connections),
        "connections": connections_info
    }
