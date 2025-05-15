import React, {useState, useEffect} from 'react';
import { motion } from 'framer-motion';

export default function Counter() {
  const [count, setCount] = useState(0)
  const [error, setError] = useState(null)

  // Function to update count from server
  const updateCount = async () => {
    try {
      const res = await fetch("http://localhost:3000/count", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      console.log('Current count from server:', data.count)
      setCount(data.count)
    } catch (error) {
      console.error("Error fetching count:", error)
      setError("Failed to fetch count")
    }
  }

  // Initial fetch
  useEffect(() => {
    updateCount()
  }, [])

  const add = async () => {
    try {
      console.log('Current count before add:', count)
      setError(null)
      const res = await fetch("http://localhost:3000/add", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      console.log('New count after add:', data.count)
      setCount(data.count)
    } catch (error) {
      console.error("Error adding count:", error)
      setError("Failed to add count")
    }
  }

  const subtract = async () => {
    try {
      if (count === 0) {
        setError('Count cannot go below zero.');
        return;
      }
      console.log('Current count before subtract:', count)
      setError(null)
      const res = await fetch("http://localhost:3000/subtract", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
      })
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`)
      }
      const data = await res.json()
      console.log('New count after subtract:', data.count)
      setCount(data.count)
    } catch (error) {
      console.error("Error subtracting count:", error)
      setError("Failed to subtract count")
    }
  }

  return (
    <div className="min-h-screen bg-white text-black flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="bg-white p-10 rounded-4xl shadow-lg w-full max-w-md"
      >
        <motion.h1
          key={count}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-4xl font-bold text-center mb-8"
        >
          Count: {count}
        </motion.h1>
        
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-center text-sm"
          >
            {error}
          </motion.div>
        )}
        
        <div className="flex gap-6 justify-center">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={add}
            className="px-6 py-3 bg-black text-white rounded-lg shadow hover:shadow-md transition"
          >
            Add
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={subtract}
            className="px-6 py-3 bg-neutral-800 text-white rounded-lg shadow hover:shadow-md transition"
          >
            Subtract
          </motion.button>
        </div>
      </motion.div>
    </div>
  )
} 
