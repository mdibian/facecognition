const express = require('express')
const knex = require('knex')
const bcrypt = require('bcrypt-nodejs')
const fs = require('fs')
const cors = require('cors')
const Clarifai = require('clarifai')

const app = express();

app.use(express.json());
app.use(cors());

// Set your path to a credentials file
const credentials = JSON.parse(fs.readFileSync('../../credentials'));

const CLIENT = credentials.client;
const HOST = credentials.host;
const USER = credentials.user;
const PASSWORD = credentials.password;
const DATABASE = credentials.database;
const API_KEY = credentials.apiKey;

const clarifaiApp = new Clarifai.App({
  apiKey: API_KEY
});

const db = knex({
  client: CLIENT,
  connection: {
    host: HOST,
    user: USER,
    password: PASSWORD,
    database: DATABASE
  }
});

app.listen(3000, () => {
  console.log('App is running on port 3000!')
})

app.get('/users', (req, res) => {
  db.select('*').from('users')
    .then(response => res.json(response))
})

app.post('/signin', (req, res) => {
  const {email, password} = req.body;

  db('login').select('email', 'hash')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);

      if (isValid) {
        db('users').select('*')
          .where('email', '=', email)
          .then(user => { 
            res.json(user[0])
          })
          .catch(err => res.status(400).json('unable to get user!'))
      } else {
        res.status(400).json('unable to sign in!')
      }
    })
    .catch(err => res.status(400).json('unable to sign in!'))
})

app.post('/register', (req, res) => {
  const { name, email, password, passconfirm } = req.body;

  if (password === passconfirm) {
    const hash = bcrypt.hashSync(password);

    db.transaction(trx => {
      trx('login').insert({
        email: email,
        hash: hash
      }, 'email')
      .then(email => {
        trx('users').insert({
          name: name,
          email: email[0],
          joined: new Date()
        }, '*')
        .then(user => {
          res.json(user[0]);
        })
        .then(trx.commit)
        .catch(trx.rollback)
      })
      .catch(err => res.status(400).json('unable to register!'))
    })
  } else {
    res.status(400).json('failed to register!');
  }
})

app.get('/profile/:id', (req, res) => {
  const { id } = req.params;

  db.select('*').from('users').where({ id })
    .then(user => {
      if (user.length) {
        res.json(user[0])
      } else {
        res.status(400).json('not found');
      }
    })
    .catch(err => res.status(400).json('error getting user'))
})

app.put('/entries', (req, res) => {
  const { loaded_user_id } = req.body;

  db('users').where('id', '=', loaded_user_id)
    .increment('entries', 1)
    .returning('entries')
    .then(entries => {
      res.json(entries[0]);
    })
    .catch(err => res.status(400).json('unable to get entries'))
})

app.post('/imageUrl', (req, res) => {
  clarifaiApp.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
  .then(respose => {
    res.json(respose);
  })
  .catch(err => res.json.status(400).json('unable to work with API!'))
})