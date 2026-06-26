import redis
import json
from typing import Any, Optional
from app.core.config import settings
import logging

logger = logging.getLogger(__name__)

# Initialize Redis client
redis_client = redis.from_url(settings.REDIS_URL, decode_responses=True)

def set_cache(key: str, value: Any, expire: int = 3600) -> bool:
    """Set value in cache with expiration (default 1 hour)"""
    try:
        redis_client.set(key, json.dumps(value), ex=expire)
        return True
    except Exception as e:
        logger.error(f"Redis set error: {e}")
        return False

def get_cache(key: str) -> Optional[Any]:
    """Get value from cache"""
    try:
        data = redis_client.get(key)
        return json.loads(data) if data else None
    except Exception as e:
        logger.error(f"Redis get error: {e}")
        return None

def delete_cache(key: str) -> bool:
    """Delete key from cache"""
    try:
        redis_client.delete(key)
        return True
    except Exception as e:
        logger.error(f"Redis delete error: {e}")
        return False

def cache_response(key_prefix: str, expire: int = 3600):
    """Decorator to cache API responses"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            # Create a unique key based on function name and arguments
            cache_key = f"{key_prefix}:{func.__name__}:{hash(str(args) + str(kwargs))}"
            
            cached_data = get_cache(cache_key)
            if cached_data:
                return cached_data
            
            result = await func(*args, **kwargs)
            set_cache(cache_key, result, expire=expire)
            return result
        return wrapper
    return decorator
