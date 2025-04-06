import { Card, CardContent, Typography, Button, Chip } from '@mui/material'
import { LocationOn, Schedule, People } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import './OpportunityCard.css'

const OpportunityCard = ({ opportunity }) => {
  return (
    <Card className="opportunity-card">
      <CardContent>
        <Typography variant="h5" component="h2">
          {opportunity.title}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {opportunity.organization?.name}
        </Typography>
        
        <div className="opportunity-meta">
          <div className="meta-item">
            <LocationOn fontSize="small" />
            <span>{opportunity.location}</span>
          </div>
          <div className="meta-item">
            <Schedule fontSize="small" />
            <span>{new Date(opportunity.date).toLocaleDateString()}</span>
          </div>
          <div className="meta-item">
            <People fontSize="small" />
            <span>{opportunity.volunteersNeeded} needed</span>
          </div>
        </div>
        
        <div className="skills-container">
          {opportunity.skillsRequired?.map((skill, index) => (
            <Chip key={index} label={skill} size="small" className="skill-chip" />
          ))}
        </div>
        
        <Typography variant="body2" component="p" className="description">
          {opportunity.description.substring(0, 150)}...
        </Typography>
        
        <Button 
          component={Link}
          to={`/opportunities/${opportunity._id}`}
          variant="contained"
          color="primary"
          fullWidth
          className="view-button"
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  )
}

export default OpportunityCard