import dotenv from 'dotenv'
import request from 'request'

dotenv.config()

const mapboxKey = process.env.GEOKEY

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=${mapboxKey}&limit=1&language=en`

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback(`Unable to connect to location services.`, undefined)
    } else if (body.features.length === 0) {
      callback(`Unable to find location. Try another search.`)
    } else {
      const { center, place_name } = body.features[0]
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      })
    }
  })
}

export default geocode
