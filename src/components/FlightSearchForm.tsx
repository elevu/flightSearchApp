import React, { useEffect } from 'react'
import { AutoComplete, Button, Form, Input, Space, message } from 'antd'
import type { Airport } from '../services/types/Airport'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { flightTakeOff } from '../assets/flightTakeOff.tsx'
import { flightLand } from '../assets/flightLand.tsx'
import { useMinimumLoading } from '../hooks/useMinimumLoading.ts'
import { loadAirports } from '../services/data.ts'

const formatAirport = (airport: Airport) => `${airport.city}, (${airport.country}) ${airport.code}`

const FlightSearchForm: React.FC = () => {
  const [form] = Form.useForm()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data } = useMinimumLoading<Airport[]>(loadAirports, 50)
  const airports = data ?? []
  useEffect(() => {
    const from = searchParams.get('from') || ''
    const to = searchParams.get('to') || ''
    form.setFieldsValue({ origin: from, destination: to })
  }, [form, searchParams])

  const validAirportCodes = airports.map((a) => a.code)

  const onFinish = (values: any) => {
    const { origin, destination } = values

    if (!validAirportCodes.includes(origin)) {
      message.error(`Invalid origin airport code: "${origin}"`)
      return
    }
    if (!validAirportCodes.includes(destination)) {
      message.error(`Invalid destination airport code: "${destination}"`)
      return
    }
    if (origin === destination) {
      message.error('Origin and destination cannot be the same.')
      return
    }

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    navigate(`/search?from=${origin}&to=${destination}`)
  }

  const airportOptions = airports.map((airport) => ({
    value: airport.code,
    label: formatAirport(airport),
  }))

  return (
    <Form
      form={form}
      layout='vertical'
      style={{ width: '100%', minWidth: 400, paddingTop: 20 }}
      onFinish={onFinish}
    >
      <Space.Compact
        size='large'
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <Form.Item
          name='origin'
          style={{ width: '30%' }}
          rules={[
            { required: true, message: 'Please select an origin airport' },
            {
              validator: (_, value) =>
                value && !validAirportCodes.includes(value)
                  ? Promise.reject('Invalid origin airport code')
                  : Promise.resolve(),
            },
          ]}
        >
          <AutoComplete
            options={airportOptions}
            filterOption={(inputValue, option) =>
              option?.label.toLowerCase().includes(inputValue.toLowerCase())
            }
          >
            <Input prefix={flightTakeOff} placeholder='From' style={{ height: '100%' }} />
          </AutoComplete>
        </Form.Item>

        <Form.Item
          name='destination'
          style={{ width: '30%' }}
          dependencies={['origin']}
          rules={[
            { required: true, message: 'Please select a destination airport' },
            {
              validator: (_, value) => {
                const origin = form.getFieldValue('origin')
                if (value && !validAirportCodes.includes(value)) {
                  return Promise.reject('Invalid destination airport code')
                }
                if (value && origin === value) {
                  return Promise.reject('Origin and destination must differ')
                }
                return Promise.resolve()
              },
            },
          ]}
        >
          <AutoComplete
            options={airportOptions}
            filterOption={(inputValue, option) =>
              option?.label.toLowerCase().includes(inputValue.toLowerCase())
            }
            style={{ width: '100%' }}
          >
            <Input prefix={flightLand} placeholder='To' style={{ height: '100%' }} />
          </AutoComplete>
        </Form.Item>

        <Button type='primary' htmlType='submit' style={{ width: '20%' }}>
          Search flights
        </Button>
      </Space.Compact>
    </Form>
  )
}

export default FlightSearchForm
