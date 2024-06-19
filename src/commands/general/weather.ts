
import { type Client, type Message } from 'whatsapp-web.js';
import { AirQuality, Weather } from '../../types/weather.js';

export const name = 'weather';
export const args = true;
export const aliases = ['we', 'wr'];
export const description = 'Fetch weather info';
export const category = 'General';
/**
 * @memberof! module:General
 * @name weather
 * @description
 * Fetch weather info
 *
 * **Usage:**
 * - !weather Delhi, India
 */ 
export async function run(client: Client, msg: Message, args: string[]) {

    let location = args.join(' ')
    let forecast = false;
    if(location.toLowerCase().includes("--forecast")){
      location = location.replace("--forecast",""); 
      forecast = true
    }
    const geocode = await (await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=1&appid=${process.env.OPENWEATHERMAP_KEY}`)).json()

    if(geocode.length == 0) return msg.reply(`No results for ${location}`)

    const lat = geocode[0].lat
    const lon = geocode[0].lon
    const name = `${geocode[0].name}, ${geocode[0].state} ${geocode[0].country}`

    const AirQuality: AirQuality = await (await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_KEY}`)).json()
    const Weather: Weather = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`)).json()

    
    const so2Index = classifySinglePollutant(AirQuality.list[0].components.so2, [0, 20], [20, 80], [80, 250], [250, 350], 350);
    const no2Index = classifySinglePollutant(AirQuality.list[0].components.no2, [0, 40], [40, 70], [70, 150], [150, 200], 200);
    const pm10Index = classifySinglePollutant(AirQuality.list[0].components.pm10, [0, 20], [20, 50], [50, 100], [100, 200], 200);
    const pm25Index = classifySinglePollutant(AirQuality.list[0].components.pm2_5, [0, 10], [10, 25], [25, 50], [50, 75], 75);
    const o3Index = classifySinglePollutant(AirQuality.list[0].components.o3, [0, 60], [60, 100], [100, 140], [140, 180], 180);
    const coIndex = classifySinglePollutant(AirQuality.list[0].components.co, [0, 4400], [4400, 9400], [9400, 12400], [12400, 15400], 15400);
    const AirQualityText = qualityList[AirQuality.list[0].main.aqi]

    const aqiRes = `Air Quality - \`${AirQualityText || `what the fuck is this air bruh ${AirQuality.list[0].main.aqi}`}\`\n\n`
                    + `Main pollutants (μg/m3) -\n`
                    + `SO2 - \`${AirQuality.list[0].components.so2} (${so2Index})\`\n`
                    + `NO2 - \`${AirQuality.list[0].components.no2} (${no2Index})\`\n`
                    + `PM10 - \`${AirQuality.list[0].components.pm10} (${pm10Index})\`\n`
                    + `PM2.5 - \`${AirQuality.list[0].components.pm2_5} (${pm25Index})\`\n`
                    + `O3 - \`${AirQuality.list[0].components.o3} (${o3Index})\`\n`
                    + `CO - \`${AirQuality.list[0].components.co} (${coIndex})\`\n`
                    + `NO3 - \`${AirQuality.list[0].components.no2}\`\n`
                    + `NH3 - \`${AirQuality.list[0].components.nh3}\`\n`

  const Sunrise = new Date((Weather.dt * 1000) - (Weather.sys.sunrise * 1000))
  const Sunset = new Date((Weather.sys.sunset * 1000) - (Weather.dt * 1000))
  const weatherRes = `Location - \`${name}\`\n`
                      + `Weather - \`${Weather.weather[0].main}, ${Weather.weather[0].description}\`\n`
                      + `Temperature - \`${Weather.main.temp}°C\`\n`
                      + `Feels Like - \`${Weather.main.feels_like}°C\`\n`
                      + `Min Temp. - \`${Weather.main.temp_min}°C\`\n`
                      + `Max Temp. - \`${Weather.main.temp_max}°C\`\n`
                      + `Humidity - \`${Weather.main.humidity}%\`\n`
                      + `Pressure - \`${Weather.main.pressure} hPa\`\n`
                      + `Visibility - \`${Weather.visibility} meters\`\n`
                      + `Wind Speed - \`${Weather.wind.speed} m/s\`\n`
                      + `Wind Direction - \`${Weather.wind.deg}°\`\n`
                      + `Cloudiness - \`${Weather.clouds.all}%\`\n`
                      + `Rain - \`${Weather.rain?.['1h'] ? `${Weather.rain?.['1h']}mm` : "No rain"}\`\n`
                      + `Snow - \`${Weather.snow?.['1h'] ? `${Weather.snow?.['1h']}mm` : "No snow"}\`\n`
                      + `Current Time - \`${new Date(Weather.dt * 1000).toUTCString()}\`\n`
                      + `Sunrise - \`${Sunrise.getHours()}h ${Sunrise.getMinutes()}m ago\`\n`
                      + `Sunset - \`In ${Sunset.getHours()}h ${Sunset.getMinutes()}m\``
  
  const forecastData = await (await fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHERMAP_KEY}&units=metric`)).json()
  const forecastList: Weather[] = forecastData.list
  let forecastRes = ``;
  let forecastDays = ["","Tomorrow","In 1 day","In 2 days"]
  for(let i = 8; i < 25; i+=8){
    if(i > forecastData.cnt) return;
    forecastRes += `\`Weather ${forecastDays[i/8]}\`\n`
    forecastRes += `Weather - \`${forecastList[i].weather[0].main}, ${forecastList[i].weather[0].description}\`\n`
    forecastRes += `Min Temp. - \`${forecastList[i].main.temp_min}°C\`\n`
    forecastRes += `Max Temp. - \`${forecastList[i].main.temp_min}°C\`\n`;
    forecastRes += `Humidity - \`${forecastList[i].main.humidity}%\`\n\n`
  }

  await msg.reply(weatherRes)
  await msg.reply(aqiRes);
  if(forecast) await msg.reply(forecastRes);
}   

const qualityList = ['Good',"Fair","Moderate","Poor","Very Poor"]

function clean(text: unknown): string {
	if (typeof text === 'string') {
		return text
			.replace(/`/g, `\`${String.fromCharCode(8203)}`)
			.replace(/@/g, `@${String.fromCharCode(8203)}`);
	}
	return String(text);
}

const classifySinglePollutant = (value: number, goodRange: number[], fairRange: number[], moderateRange: number[], poorRange: number[], veryPoorMin: number): string => {
    if (value < goodRange[1]) return 'Good';
    if (value < fairRange[1]) return "Fair";
    if (value < moderateRange[1]) return 'Moderate';
    if (value < poorRange[1]) return 'Poor';
    return 'Very Poor';
  };
