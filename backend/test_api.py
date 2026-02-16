import requests
import sys

API_URL = "http://localhost:8000/api/v1/analyze"

def test_api():
    print("🧪 Testing TerraTwin Backend...")
    
    # Create a dummy image file in memory
    files = {'file': ('test_leaf.jpg', b'fake_image_bytes', 'image/jpeg')}
    params = {'lat': 37.7749, 'lon': -122.4194}
    
    try:
        response = requests.post(API_URL, files=files, params=params)
        
        if response.status_code == 200:
            data = response.json()
            print("\n✅ API Success!")
            print(f"diagnosis: {data['disease_analysis']['disease']}")
            print(f"confidence: {data['disease_analysis']['confidence']}")
            print(f"risk: {data['risk_assessment']}")
            print(f"recommendations: {len(data['recommendation'])} items found")
        else:
            print(f"\n❌ API Failed: {response.status_code}")
            print(response.text)
            
    except requests.exceptions.ConnectionError:
        print("\n❌ Could not connect to backend.")
        print("Make sure it's running: 'uvicorn main:app --reload' in /backend")

if __name__ == "__main__":
    test_api()
