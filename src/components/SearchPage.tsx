import React from 'react'
import FlightSearchForm from './FlightSearchForm'

const SearchPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '90vh',
        backgroundImage: 'url("/hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
      }}
    >
      <h1
        style={{
          color: 'white',
          fontSize: '1.8rem',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: 32,
          textShadow: '0 2px 8px rgba(0,0,0,0.6)',
        }}
      >
        Business travel made easy
      </h1>

      <div
        style={{
          background: 'white',
          borderRadius: 2,
          padding: 24,
          width: '100%',
          maxWidth: 1000,
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <FlightSearchForm />
      </div>
    </div>
  )
}

export default SearchPage
