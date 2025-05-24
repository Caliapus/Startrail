let cities = [];

async function loadCities() {
  const cached = localStorage.getItem('citiesData');
  if (cached) {
    cities = JSON.parse(cached);
  } else {
    const response = await fetch('../data/cities5000.csv');
    const text = await response.text();

    cities = text.split('\n')
      .map(line => line.trim())
      .filter(line => line)
      .map(line => {
        const [lat, lon, name, country] = line.split('\t');
        return {
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          name: name,
          country: country
        };
      });

    localStorage.setItem('citiesData', JSON.stringify(cities));
  }

  // If we already have coordinates, update location after cities load
  if (latestCoords && locationInput && locationInput.value.startsWith("Lat:")) {
    const city = getCity(latestCoords.latitude, latestCoords.longitude);
    if (city) {
      locationInput.value = city.name;
    }
  }
}

function getCity(lat, lon) {
  if (!cities.length) {
    console.warn("City data not loaded yet.");
    return null;
  }

  let closest = null;
  let minDistance = Infinity;

  for (const city of cities) {
    const d = Math.pow(city.lat - lat, 2) + Math.pow(city.lon - lon, 2);
    if (d < minDistance) {
      minDistance = d;
      closest = city;
    }
  }

  return closest;
}
