// dependencies
const express = require('express')
const app = express()
const cors = require('cors')
const db = require('./db/db_config');

// port
const PORT = process.env.PORT || 4000

// middle wares
app.use(express.json())
app.use(cors())
app.use(express.static('public'))

// ----------------------- USERS routes ----------------------- //
// get all
app.get('/api/users', async (req, res) => {
    try {
        const {rows} = await db.query('SELECT * FROM users')
        res.status(200).json(rows)
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// get 1
app.get('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows} = await db.query('SELECT * FROM users WHERE user_id = $1', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// post 1
app.post('/api/users', async (req, res) => {
    try {
        const {user_name, user_age} = req.body
        // data validation
        if (typeof user_name !== 'string' || typeof user_age !== 'number') {
            res.status(404).send('Bad request')
        } else {
            const {rows} = await db.query('INSERT INTO users (user_name, user_age) VALUES ($1, $2) RETURNING *', [user_name, user_age])
            res.status(201).json(rows)
        }
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// delete 1
app.delete('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows} = await db.query('DELETE FROM users WHERE user_id = $1 RETURNING *', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// update 1
app.patch('/api/users/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {user_name, user_age} = req.body
        // data validation
        if (typeof user_name !== 'string' || typeof user_age !== 'number') {
            res.status(404).send('Bad request')
        } else {
            const {rows} = await db.query('UPDATE users SET user_name = $1, user_age = $2 WHERE user_id = $3 RETURNING *', [user_name, user_age, id])
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})
// ----------------------- USERS routes ----------------------- //


// ----------------------- COUNTRIES routes ----------------------- //
// get all 
app.get('/api/countries', async (req, res) => {
    try {
        const {rows} = await db.query('SELECT * FROM countries')
        res.status(200).json(rows)
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// get 1
app.get('/api/countries/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows} = await db.query('SELECT * FROM countries WHERE country_id = $1', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// post one
app.post('/api/countries', async (req, res) => {
    try {
        const {country_name, user_id} = req.body
        // data validation
        if (typeof country_name !== 'string' || typeof user_id !== 'number') {
            res.status(404).send('Bad request')
        } else {
            const {rows} = await db.query('INSERT INTO countries (country_name, user_id) VALUES ($1, $2) RETURNING *', [country_name, user_id])
            res.status(201).json(rows)
        }
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// delete one
app.delete('/api/countries/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {rows} = await db.query('DELETE FROM countries WHERE country_id = $1 RETURNING *', [id])
        res.status(200).json(rows)
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})

// update one
app.patch('/api/countries/:id', async (req, res) => {
    try {
        const {id} = req.params
        const {country_name, user_id} = req.body
        // data validation
        if (typeof country_name !== 'string' || typeof user_id !== 'number') {
            res.status(404).send('Bad request')
        } else {
            const {rows} = await db.query('UPDATE countries SET country_name = $1, user_id = $2 WHERE country_id = $3 RETURNING *', [country_name, user_id, id])
            res.status(200).json(rows)
        }
    } catch (error) {
        console.log("Internal server error")
        res.status(500).json(error)
    }
})
// ----------------------- COUNTRIES routes ----------------------- //


// listen on port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})