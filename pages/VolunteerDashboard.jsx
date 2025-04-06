import { useEffect, useState } from 'react'
import { Container, Typography, Tabs, Tab, Box } from '@mui/material'
import { useAuth } from '../hooks/useAuth'
import { fetchUserApplications } from '../utils/api'
import './Dashboard.css'

const VolunteerDashboard = () => {
  const { currentUser } = useAuth()
  const [applications, setApplications] = useState([])
  const [tabValue, setTabValue] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadApplications = async () => {
      if (currentUser) {
        try {
          const data = await fetchUserApplications(currentUser._id)
          setApplications(data)
        } catch (error) {
          console.error('Failed to load applications:', error)
        } finally {
          setLoading(false)
        }
      }
    }
    loadApplications()
  }, [currentUser])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }

  return (
    <Container maxWidth="lg" className="dashboard-container">
      <Typography variant="h4" component="h1" className="dashboard-title">
        Volunteer Dashboard
      </Typography>
      
      <Tabs value={tabValue} onChange={handleTabChange} aria-label="dashboard tabs">
        <Tab label="My Applications" />
        <Tab label="Saved Opportunities" />
        <Tab label="Volunteer History" />
      </Tabs>
      
      <Box sx={{ pt: 3 }}>
        {tabValue === 0 && (
          <div className="tab-content">
            {loading ? (
              <div className="loading-spinner">Loading applications...</div>
            ) : applications.length > 0 ? (
              <div className="applications-list">
                {applications.map(app => (
                  <div key={app._id} className="application-card">
                    <h3>{app.opportunity.title}</h3>
                    <p>Status: {app.status}</p>
                    <p>Applied on: {new Date(app.appliedAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            ) : (
              <Typography variant="body1" className="no-data">
                You haven't applied to any opportunities yet.
              </Typography>
            )}
          </div>
        )}
        
        {tabValue === 1 && (
          <div className="tab-content">
            <Typography variant="body1" className="no-data">
              Your saved opportunities will appear here.
            </Typography>
          </div>
        )}
        
        {tabValue === 2 && (
          <div className="tab-content">
            <Typography variant="body1" className="no-data">
              Your volunteer history will appear here.
            </Typography>
          </div>
        )}
      </Box>
    </Container>
  )
}

export default VolunteerDashboard