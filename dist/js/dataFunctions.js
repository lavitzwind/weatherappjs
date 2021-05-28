const WEATHER_API_KEY = "a9c808c67afa3ab6d35fb1e1b37a0086";

export const setLocationObject = (locationObj, coordsObj) => {
	const { lat, lon, name, unit } = coordsObj;
	locationObj.setLat(lat);
	locationObj.setLon(lon);
	locationObj.setName(name);
	if (unit) {
		locationObj.setUnit(unit);
	}
};

export const getHomeLocation = () => {
	return localStorage.getItem("defaultWeatherLocation");
};

export const getWeatherFromCoords = async (locationObj) => {
	const lat = locationObj.getLat();
	const lon = locationObj.getLon();
	const units = locationObj.getUnit();
	const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly,alerts&units=${units}&appid=${WEATHER_API_KEY}`;
};

export const getCoordsFromApi = async (entryText, units) => {
	const regex = /^\d+$/g;
	const flag = regex.test(entryText) ? "zip" : "q";
	console.log(flag);
	const url = `https://api.openweathermap.org/data/2.5/weather?${flag}=${entryText}&units=${units}&appid=${WEATHER_API_KEY}`;
	const encodedUrl = encodeURI(url);
	try {
		const dataStream = await fetch(encodedUrl);
		const jsonData = await dataStream.json();
		console.log(jsonData);
		return jsonData;
	} catch (err) {
		console.error(err.stack);
	}
};

export const cleanText = (text) => {
	const regex = / {2,}/g;
	const entryText = text.replaceAll(regex, " ").trim();
	return entryText;
};
