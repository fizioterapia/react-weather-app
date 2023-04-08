export default async function callAPI(city) {
  return await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${
      import.meta.env.VITE_OPENWEATHER_API_KEY
    }&units=metric`
  );
}
