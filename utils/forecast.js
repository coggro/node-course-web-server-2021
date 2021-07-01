import request from 'request'
import { weatherstackKey } from '../keys.js'

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${weatherstackKey}&query=${latitude},${longitude}&units=f`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(`Unable to connect to forecast services.`, undefined)
    } else if (body.error) {
      callback(body.error.info, undefined)
    } else {
      const { weather_descriptions, temperature, feelslike } = body.current
      callback(
        undefined,
        `${weather_descriptions}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      )
    }
  })
}

export default forecast
