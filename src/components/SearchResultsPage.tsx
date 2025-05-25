import React, { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Checkbox, Row, Col, Typography, Select, Space } from 'antd'
import type { Flight } from '../services/types/Flight'
import { useMinimumLoading } from '../hooks/useMinimumLoading'
import { loadFlights } from '../services/data.ts'
import { FlightCard } from './FlightCard/FlightCard.tsx'
import FlightSearchForm from './FlightSearchForm.tsx'

const { Text, Title } = Typography
const { Option } = Select

const SearchResults: React.FC = () => {
  const { data, loading } = useMinimumLoading<Flight[]>(loadFlights, 800)
  const [directOnly, setDirectOnly] = useState(false)
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price')
  const allFlights = useMemo<Flight[]>(() => data ?? [], [data])
  const [searchParams] = useSearchParams()
  const from = searchParams.get('from')
  const to = searchParams.get('to')

  const sortedFlights = useMemo(() => {
    const results = allFlights.filter((flight) => {
      const matchesRoute = flight.origin === from && flight.destination === to
      const matchesStops = directOnly ? flight.stops === 0 : true
      return matchesRoute && matchesStops
    })

    switch (sortBy) {
      case 'price':
        return results.sort((a, b) => a.price - b.price)
      case 'duration':
        return results.sort((a, b) => a.duration - b.duration)
      case 'departure':
        return results.sort(
          (a, b) => new Date(a.departureTime).getTime() - new Date(b.departureTime).getTime(),
        )
      default:
        return results
    }
  }, [from, to, directOnly, sortBy, allFlights])

  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#f5f5f5',
        display: 'flex',
        justifyContent: 'center',
        padding: '2rem',
      }}
    >
      <div style={{ width: '100%', maxWidth: 1200 }}>
        <div
          style={{
            marginBottom: 32,
            background: '#fff',
            padding: 24,
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)',
          }}
        >
          <FlightSearchForm />
        </div>

        <Row justify='space-between' align='middle' style={{ marginBottom: 20 }}>
          <Col>
            <Title level={3}>
              Flights from {from} to {to}
            </Title>
            <Checkbox
              checked={directOnly}
              onChange={(e) => {
                setDirectOnly(e.target.checked)
              }}
              style={{ marginTop: 8 }}
            >
              Direct flights only
            </Checkbox>
          </Col>
          <Col>
            <Space>
              <Text strong>Sort by:</Text>
              <Select
                value={sortBy}
                onChange={(val) => {
                  setSortBy(val)
                }}
                style={{ width: 150 }}
              >
                <Option value='price'>Price</Option>
                <Option value='duration'>Duration</Option>
                <Option value='departure'>Departure Time</Option>
              </Select>
            </Space>
          </Col>
        </Row>

        {loading
          ? Array.from({ length: 5 }, (_, i) => (
              <FlightCard key={`skeleton-${String(i)}`} flight={{} as Flight} loading={loading} />
            ))
          : sortedFlights.map((flight) => (
              <FlightCard key={flight.id} flight={flight} loading={loading} />
            ))}

        {sortedFlights.length === 0 && <Text>No flights found matching your search.</Text>}
      </div>
    </div>
  )
}

export default SearchResults
