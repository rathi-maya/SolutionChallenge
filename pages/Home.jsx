import { useEffect, useState } from 'react'
import { Container, Grid, Typography, Button } from '@mui/material'
import OpportunityCard from '../components/OpportunityCard'
import SearchFilter from '../components/SearchFilter'
import { fetchFeaturedOpportunities } from '../utils/api'
import './Home.css'

const Home = () => {
  const [opportunities, setOpportunities] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const data = await fetchFeaturedOpportunities()
        setOpportunities(data)
      } catch (error) {
        console.error('Failed to load opportunities:', error)
      } finally {
        setLoading(false)
      }
    }
    loadOpportunities()
  }, [])

  return (
    <div className="home-page">
      <div className="hero-section">
        <Container maxWidth="md">
          <Typography variant="h2" component="h1" className="hero-title">
            Connect with Causes That Matter
          </Typography>
          <Typography variant="h5" className="hero-subtitle">
            Find volunteer opportunities that match your skills and passions
          </Typography>
          <div className="hero-actions">
            <Button 
              variant="contained" 
              size="large" 
              href="/opportunities"
              className="hero-button"
            >
              Browse Opportunities
            </Button>
            <Button 
              variant="outlined" 
              size="large" 
              href="/organization"
              className="hero-button"
            >
              For Organizations
            </Button>
          </div>
        </Container>
      </div>

      <Container maxWidth="lg" className="featured-section">
        <Typography variant="h4" component="h2" className="section-title">
          Featured Opportunities
        </Typography>
        
        {loading ? (
          <div className="loading-spinner">Loading...</div>
        ) : (
          <Grid container spacing={4}>
            {opportunities.map(opportunity => (
              <Grid item xs={12} sm={6} md={4} key={opportunity._id}>
                <OpportunityCard opportunity={opportunity} />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </div>
  )
}

export default Home