// import express
import express from 'express'
import hbs from 'hbs'
import path from 'path'
import { fileURLToPath } from 'url'
import geocode from '../utils/geocode.js'
import forecast from '../utils/forecast.js'

// __dirname workaround and paths for express
const __filename = fileURLToPath(import.meta.url),
  __dirname = path.dirname(__filename),
  publicDirectoryPath = path.join(__dirname, `..`, `/public`),
  viewsPath = path.join(__dirname, `../templates/views`),
  partialsPath = path.join(__dirname, `../templates/partials`)

// end workaround

// call express to create server
const app = express()

// setup hbs engine and views location
app.set(`view engine`, `hbs`)
app.set(`views`, viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory
app.use(express.static(publicDirectoryPath))

app.get(``, (req, res) => {
  res.render(`index`, {
    title: `Weather App`,
    name: `Corey Gross`,
  })
})

app.get(`/about`, (req, res) => {
  res.render(`about`, {
    title: `About`,
    name: `Corey Gross`,
  })
})

app.get(`/help`, (req, res) => {
  res.render(`help`, {
    title: `Help`,
    message: `This is a help message`,
    name: `Corey Gross`,
  })
})

app.get(`/weather`, (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: `You must provide a location.`,
    })
  }
  geocode(
    req.query.address,
    (geoErr, { latitude, longitude, location } = {}) => {
      if (geoErr) {
        return res.send({
          error: geoErr,
        })
      } else {
        forecast(latitude, longitude, (forecastErr, forecastData) => {
          if (forecastErr) {
            return res.send({ error: forecastErr })
          } else {
            res.send({
              forecast: forecastData,
              location: location,
            })
          }
        })
      }
    }
  )
})

app.get(`/products`, (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: `You must provide a search term`,
    })
  }
  res.send({
    products: [],
  })
})

app.get(`/help/*`, (req, res) => {
  res.render(`404`, {
    title: `404`,
    name: `Corey Gross`,
    message: `Help article not found`,
  })
})

app.get(`*`, (req, res) => {
  res.render(`404`, {
    title: `404`,
    name: `Corey Gross`,
    message: `Page not found`,
  })
})

// Set the server to listen on a prescribed port
app.listen(`3000`, () => {
  console.log(`Server is up on localhost:3000`)
})
