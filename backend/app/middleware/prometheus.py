from prometheus_fastapi_instrumentator import Instrumentator
from fastapi import FastAPI


def setup_prometheus(app: FastAPI):
    """Setup Prometheus metrics collection for the application."""
    instrumentator = Instrumentator(
        should_group_status_codes=False,
        should_ignore_untemplated=True,
        should_group_untemplated=True,
        excluded_handlers=["/metrics"],
        env_var_name="ENABLE_METRICS",
    )
    
    instrumentator.instrument(app).expose(app, endpoint="/metrics", include_in_schema=False)
