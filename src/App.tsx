import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import SearchResults from './components/SearchResultsPage.tsx'
import { ConfigProvider, Layout, Result, theme } from 'antd'
import React from 'react'
import SearchPage from './components/SearchPage.tsx'

const { Header, Content, Footer } = Layout

const App: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken()

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b054',
          borderRadius: 2,
        },
        components: {
          Layout: {
            headerBg: '#00b054',
          },
        },
      }}
    >
      <Layout style={{ minHeight: '100vh', margin: 0, padding: 0 }}>
        <Router>
          <Header style={{ padding: 0, height: 90 }}>
            <Link to='/'>
              <img
                src='/dib-logo.svg'
                alt='Logo'
                style={{ height: 62, width: 66, margin: 14, cursor: 'pointer' }}
              />
            </Link>
          </Header>
          <Content>
            <div
              style={{
                background: colorBgContainer,
                minHeight: 280,
                borderRadius: borderRadiusLG,
              }}
            >
              <Routes>
                <Route path='/' element={<SearchPage />} />
                <Route path='/search' element={<SearchResults />} />
                <Route
                  path='*'
                  element={
                    <Result
                      status='404'
                      title='404'
                      subTitle='Sorry, the page you visited does not exist.'
                    />
                  }
                />
              </Routes>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Copyright ©{new Date().getFullYear()} DIB Travel
          </Footer>
        </Router>
      </Layout>
    </ConfigProvider>
  )
}

export default App