import { createContext, useState, useEffect } from 'react'
import { checkAuth } from '../utils/api'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        const user = await checkAuth()
        setCurrentUser(user)
      } catch (error) {
        setCurrentUser(null)
      } finally {
        setLoading(false)
      }
    }
    verifyAuth()
  }, [])

  const value = {
    currentUser,
    setCurrentUser,
    loading
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}