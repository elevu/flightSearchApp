import type { Flight } from './types/Flight'
import type { Airport } from './types/Airport'

export const loadFlights = async (): Promise<Flight[]> => {
  const res = await fetch('/mocks/mock-flights.json')
  if (!res.ok) throw new Error('Failed to fetch flight data')
  return res.json() as Promise<Flight[]>
}

export const loadAirports = async (): Promise<Airport[]> => {
  const res = await fetch('/mocks/mock-airports.json')
  if (!res.ok) throw new Error('Failed to fetch airport data')
  return res.json() as Promise<Airport[]>
}
