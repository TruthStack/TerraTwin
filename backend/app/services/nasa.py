async def get_soil_data(lat: float, lon: float):
    """
    Simulates fetching data from NASA Power API.
    Returns soil moisture, temperature, and other agronomic data.
    """
    # In a real scenario, we would requests.get(NASA_URL, params=...)
    
    return {
        "soil_moisture": 42.5,  # Percentage
        "surface_temp": 24.5,   # Celsius
        "precipitation": 1.2,   # mm/day
        "solar_radiation": 18.2, # MJ/m^2/day
        "wind_speed": 12.0      # km/h
    }
