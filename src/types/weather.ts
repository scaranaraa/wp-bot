export interface WeatherData {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast[];
}

export interface Location {
  name: string;
  zipcode?: string;
  lat: string;
  long: string;
  timezone: string;
  alert: string;
  degreetype: string;
  imagerelativeurl: string;
}

export interface CurrentWeather {
  temperature: string;
  skycode: string;
  skytext: string;
  date: string;
  observationtime: string;
  observationpoint: string;
  feelslike: string;
  humidity: string;
  winddisplay: string;
  day: string;
  shortday: string;
  windspeed: string;
  imageUrl: string;
}

export interface Forecast {
  low: string;
  high: string;
  skycodeday: string;
  skytextday: string;
  date: string;
  day: string;
  shortday: string;
  precip: string;
}

export interface Weather {
  cnt?: number;
  list?: Weather[]
  coord: {
    lon: number;
    lat: number;
  };
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    "1h": number;
  };
  snow?: {
    "1h": number
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface AirQuality {
  coord: [number, number];
  list: {
    dt: number;
    main: {
      aqi: number;
    };
    components: {
      co: number;
      no: number;
      no2: number;
      o3: number;
      so2: number;
      pm2_5: number;
      pm10: number;
      nh3: number;
    };
  }[];
}
