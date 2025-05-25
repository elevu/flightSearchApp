import { Button, Card, Col, Row, Typography, Skeleton } from 'antd'
import './FlightCard.css'
import type { Flight } from '../services/types/Flight.ts'

const { Text, Title } = Typography

const formatTime = (iso: string) =>
  new Date(iso).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

export const FlightCard = ({ flight, loading }: { flight: Flight; loading: boolean }) => {
  return (
    <Card key={flight.id} style={{ marginBottom: 20 }} bodyStyle={{ padding: 24 }}>
      <Row align='middle' justify='space-between' style={{ width: '100%' }}>
        {/* Time and route */}
        <Col
          flex='1'
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          {loading ? (
            <>
              <Skeleton paragraph={{ rows: 0 }} active className='skeleton-title' />
              <Skeleton paragraph={{ rows: 0 }} active />
            </>
          ) : (
            <>
              <Title level={4} style={{ margin: 0 }}>
                {formatTime(flight.departureTime)} → {formatTime(flight.arrivalTime)}
              </Title>
              <Text type='secondary' style={{ marginTop: 4 }}>
                {flight.origin} → {flight.destination} • {Math.floor(flight.duration / 60)}h{' '}
                {flight.duration % 60}m
              </Text>
            </>
          )}
        </Col>

        {/* Airline + stops */}
        <Col
          flex='1'
          style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
          {loading ? (
            <>
              <Skeleton paragraph={{ rows: 0 }} active className='skeleton-margin' />
              <Skeleton paragraph={{ rows: 0 }} active />
            </>
          ) : (
            <>
              <Text type='secondary' style={{ marginBottom: 4 }}>
                {flight.airline} — {flight.flightNumber}
              </Text>
              <Text>
                {flight.stops === 0
                  ? 'Direct Flight'
                  : `${String(flight.stops)} Stop${flight.stops > 1 ? 's' : ''}`}
              </Text>
            </>
          )}
        </Col>

        {/* Price and button */}
        <Col flex='0 0 180px' style={{ textAlign: 'right' }}>
          {loading ? (
            <>
              <Skeleton paragraph={{ rows: 0 }} className='price-placeholder' />
              <Skeleton paragraph={{ rows: 0 }} className='price-subtitle' />
            </>
          ) : (
            <>
              <Title level={3} style={{ margin: 0 }}>
                {flight.price} EUR
              </Title>
              <Text type='secondary'>Return included</Text>
            </>
          )}
          <div style={{ marginTop: 12 }}>
            {loading ? (
              <Skeleton.Button active size='default' className='select-flight-placeholder'/>
            ) : (
              <Button type='primary'>Select flight</Button>
            )}
          </div>
        </Col>
      </Row>
    </Card>
  )
}
