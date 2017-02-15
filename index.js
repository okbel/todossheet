const express = require('express')
const app = express()
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const google = require('googleapis')
const credentials = require('./credentials.json')

const auth = new google.auth.JWT(
    credentials.client_email,
    null,
    credentials.private_key,
    ['https://www.googleapis.com/auth/spreadsheets'],
    null
)

google.options({ auth })

const sheets = google.sheets('v4')
const spreadsheetId = '1D3QXR8O_fCQebEa5OM6wPGPVgBy-Mi_RwR7fVKKTo9Q'

app.use(express.static('client/build'))

app.post('/todo', (req, res) => {
    sheets.spreadsheets.values.append({
        spreadsheetId,
        range: 'list!todo',
        valueInputOption: 'USER_ENTERED',
        includeValuesInResponse: true,
        resource: {
            values: [[req.body.item]]
        }
    }, (err, response) => {
        res.send(response.updates)
    })
})


app.get('/todo', (req, res) => {
    sheets.spreadsheets.values.get({
        spreadsheetId,
        range: 'list!todo'
    }, (err, response) => {
        res.send(response.values.map(([item]) => ({item})))
    })
})


app.listen(3000)
