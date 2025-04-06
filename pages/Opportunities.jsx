import { useState, useEffect } from 'react'
import { Container, Grid, Typography, Pagination } from '@mui/material'
import OpportunityCard from '../components/OpportunityCard'
import SearchFilter from '../components/SearchFilter'
import { fetchOpportunities } from '../utils/api'
import './Opportunities.css'

const Opportunities = () => {
  const [opportunities, setOpportunities] = useState([])
  const [filteredOpportunities, setFilteredOpportunities] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const itemsPerPage = 9

  useEffect(() => {
    const loadOpportunities = async () => {
      try {
        const data = await fetchOpportunities()
        setOpportunities(data)
        setFilteredOpportunities(data)
      } catch (error) {
        console.error('Failed to load opportunities:', error)
      } finally {
        setLoading(false)
      }
    }
    loadOpportunities()
  }, [])

  const handleSearch = (filters) => {
    const filtered = opportunities.filter(opp => {
      const locationMatch = filters.location 
        ? opp.location.toLowerCase().includes(filters.location.toLowerCase())
        : true
      
      const skillsMatch = filters.skills?.length > 0
        ? filters.skills.some(skill => opp.skillsRequired.includes(skill))
        : true
      
      const dateMatch = filters.date
        ? new Date(opp.date) >= new Date(filters.date)
        : true
      
      return locationMatch && skillsMatch && dateMatch
    })
    setFilteredOpportunities(filtered)
    setPage(1)
  }

  const handlePageChange = (event, value) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const paginatedOpportunities = filteredOpportunities.slice(
    (page - 1) * itemsPerPage,
    page * itemsPerPage
  )

  return (
    <Container maxWidth="xl" className="opportunities-page">
      <Typography variant="h3" component="h1" className="page-title">
        Volunteer Opportunities
      </Typography>
      
      <SearchFilter onSearch={handleSearch} />
      
      {loading ? (
        <div className="loading-spinner">Loading opportunities...</div>
      ) : (
        <>
          <Grid container spacing={4} className="opportunities-grid">
            {paginatedOpportunities.length > 0 ? (
              paginatedOpportunities.map(opportunity => (
                <Grid item xs={12} sm={6} md={4} key={opportunity._id}>
                  <OpportunityCard opportunity={opportunity} />
                </Grid>
              ))
            ) : (
              <Typography variant="body1" className="no-results">
                No opportunities match your search criteria.
              </Typography>
            )}
          </Grid>
          
          {filteredOpportunities.length > itemsPerPage && (
            <div className="pagination-container">
              <Pagination
                count={Math.ceil(filteredOpportunities.length / itemsPerPage)}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
              />
            </div>
          )}
        </>
      )}
    </Container>
  )
}

export default Opportunities