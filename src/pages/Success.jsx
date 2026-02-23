// frontend/src/pages/Success.jsx
import React from 'react'
import { Result, Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Success() {
  const navigate = useNavigate()

  return (
    <div className="container">
      <div className="card" style={{ padding: '60px 20px', textAlign: 'center' }}>
        <Result
          status="success"
          title={<h2 style={{ fontSize: 32, fontWeight: 700, color: '#1677ff' }}>Registration Successful 🎉</h2>}
          subTitle={
            <div style={{ fontSize: 18, color: '#666', marginTop: 10 }}>
              Your face data has been securely registered.<br />
              You may now attend classes with biometric verification.
            </div>
          }
          extra={[
            <Button 
              type="primary" 
              key="home" 
              size="large"
              style={{ height: 50, padding: '0 40px', borderRadius: 10, fontWeight: 600 }}
              onClick={() => navigate('/')}
            >
              Register Another Student
            </Button>
          ]}
        />
      </div>
    </div>
  )
}
