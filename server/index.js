const express = require("express")
const cors = require("cors")

const app = express()

// Configure CORS with specific options
app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST'],
    credentials: true
}))

// Middleware to parse JSON bodies
app.use(express.json())

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
    next()
})

// State management
let count = 0

// Function to safely update count
const updateCount = (operation) => {
    const oldCount = count
    if (operation === 'add') {
        count = count + 1
    } else if (operation === 'subtract') {
        count = count - 1
    }
    console.log(`Count updated: ${oldCount} -> ${count} (${operation})`)
    return count
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err)
    res.status(500).json({ error: 'Internal server error' })
})

app.get("/count", (req, res) => {
    try {
        console.log('[GET /count] Current count:', count)
        res.json({ count: count })
    } catch (error) {
        console.error('[GET /count] Error:', error)
        res.status(500).json({ error: "Error fetching count" })
    }
})

app.post("/add", (req, res) => {
    try {
        const newCount = updateCount('add')
        res.json({ count: newCount })
    } catch (error) {
        console.error('[POST /add] Error:', error)
        res.status(500).json({ error: "Error adding count" })
    }
})

app.post("/subtract", (req, res) => {
    try {
        const newCount = updateCount('subtract')
        res.json({ count: newCount })
    } catch (error) {
        console.error('[POST /subtract] Error:', error)
        res.status(500).json({ error: "Error subtracting count" })
    }
})

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server started on Port ${PORT}`)
    console.log(`Initial count: ${count}`)
    console.log(`CORS enabled for: http://localhost:5173`)
}) 

