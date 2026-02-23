
// below code is working perctly with modern ui design

import React, { useEffect, useRef, useState } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  Progress,
  Image,
  message
} from 'antd'
import api from '../services/api'
import { useNavigate } from 'react-router-dom'
import '../styles/camera.css'

const { Option } = Select
const MIN_IMAGES = 5
const MAX_IMAGES = 10

// 🎓 Professional Program Mapping
const programSubjects = {
  BCS_AI: [
    "Data Structures and Algorithms",
    "Artificial Intelligence",
    "Machine Learning",
    "Deep Learning",
    "Computer Vision",
    "Autonomous Robotics",
    "Mathematics for AI"
  ],
  BCS_DS: [
    "Data Structures and Algorithms",
    "Data Science",
    "Machine Learning",
    "Statistics",
    "Big Data Analytics",
    "Mathematics"
  ],
  BCS_SE: [
    "Data Structures and Algorithms",
    "Software Engineering Principles",
    "Database Systems",
    "Web Development",
    "Mobile Application Development",
    "Mathematics"
  ],
  BCS_CE: [
    "Data Structures and Algorithms",
    "Computer Architecture",
    "Operating Systems",
    "Embedded Systems",
    "Physics",
    "Mathematics"
  ],
  BCS_CYBER: [
    "Data Structures and Algorithms",
    "Cyber Security Fundamentals",
    "Network Security",
    "Ethical Hacking",
    "Cryptography",
    "Digital Forensics"
  ],
  BCS_IT: [
    "Data Structures and Algorithms",
    "Information Systems",
    "Database Systems",
    "Cloud Computing",
    "Network Technology",
    "Web Technologies"
  ]
}

// Map technical keys to user-friendly labels
const PROGRAM_LABELS = {
  BCS_AI: "BCS (Artificial Intelligence)",
  BCS_DS: "BCS (Data Science)",
  BCS_SE: "BCS (Software Engineering)",
  BCS_CE: "BCS (Computer Engineering)",
  BCS_CYBER: "BCS (Cyber Security & Network Technology)",
  BCS_IT: "BCS (Information Technology)"
}

export default function Register() {
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const [form] = Form.useForm() // Access form instance to reset fields

  const [images, setImages] = useState([])
  const [loading, setLoading] = useState(false)
  const [availableSubjects, setAvailableSubjects] = useState([])

  const navigate = useNavigate()

  // Handle Dynamic Dropdown
  const handleFacultyChange = (value) => {
    setAvailableSubjects(programSubjects[value] || [])
    // Reset subjects field when faculty changes
    form.setFieldsValue({ subjects: [] })
  }

  /* ================= CAMERA INIT ================= */
  useEffect(() => {
    let stream
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(s => {
        stream = s
        videoRef.current.srcObject = s
      })
      .catch(() => message.error('Camera access denied'))

    return () => {
      // Stop camera on unmount
      stream?.getTracks().forEach(track => track.stop())
    }
  }, [])

  /* ================= CAPTURE IMAGE ================= */
  const captureImage = () => {
    if (images.length >= MAX_IMAGES) {
      message.warning(`Maximum ${MAX_IMAGES} images allowed`)
      return
    }

    const canvas = canvasRef.current
    const video = videoRef.current

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight

    const ctx = canvas.getContext('2d')

    // Flip horizontally before drawing so stored images are normal
    ctx.save()
    ctx.scale(-1, 1)
    ctx.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)
    ctx.restore()

    const base64 = canvas.toDataURL('image/jpeg')
    setImages(prev => [...prev, base64])
  }

  /* ================= SUBMIT ================= */
  const onFinish = async (values) => {
    if (images.length < MIN_IMAGES) {
      message.error(`Capture at least ${MIN_IMAGES} face images`)
      return
    }

    setLoading(true)

    try {
      await api.post('/register', {
        ...values,
        face_images: images
      })

      message.success('Registration successful!')
      navigate('/success')
    } catch (err) {
      console.error(err)
      message.error(err.response?.data?.detail || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container">
      <div className="card">
        <div className="logo-container">
          <span className="logo-icon">🎓</span>
          <div className="logo-text">
            <span>Lincoln</span>
            <span className="logo-accent">eEnroll</span>
          </div>
        </div>
        
        <div className="form-camera-wrapper">
          {/* Section 1: Camera & Biometrics (Visual First) */}
          <div className="camera-wrapper">
            <div className="camera-container">
              <video
                ref={videoRef}
                autoPlay
                className="video"
                playsInline
              />
              <div className="camera-overlay"></div>
              <canvas ref={canvasRef} hidden />
            </div>

            <Button
              type="primary"
              size="large"
              className="capture-btn"
              onClick={captureImage}
              disabled={images.length >= MAX_IMAGES}
              icon={<span>📸</span>}
            />

            <div className="status-section">
              <div className="progress-label">
                <span>Capture Progress</span>
                <span>{images.length} / {MAX_IMAGES}</span>
              </div>
              <Progress
                percent={Math.min((images.length / MIN_IMAGES) * 100, 100)}
                status={images.length >= MIN_IMAGES ? 'success' : 'active'}
                strokeColor={{ '0%': '#108ee9', '100%': '#87d068' }}
                showInfo={false}
              />
              
              <div className="preview-grid">
                {images.map((img, i) => (
                  <Image 
                    key={i} 
                    src={img} 
                    className="preview-item"
                    preview={{ mask: 'View' }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Section 2: Registration Details */}
          <div className="form-wrapper">
            <h3 style={{ marginBottom: 24, color: '#1677ff' }}>Student Information</h3>
            <Form 
              layout="vertical" 
              form={form}
              onFinish={onFinish} 
              className="registration-form"
            >
              <Form.Item
                name="full_name"
                label="Full Name"
                rules={[{ required: true, message: 'Please enter full name' }]}
              >
                <Input placeholder="Enter your full name" size="large" />
              </Form.Item>

              <Form.Item
                name="student_id"
                label="Student ID"
                rules={[{ required: true, message: 'Please enter student ID' }]}
              >
                <Input placeholder="Ex: STU2026001" size="large" />
              </Form.Item>

              <Form.Item
                name="faculty"
                label="Program / Faculty"
                rules={[{ required: true, message: 'Please select program' }]}
              >
                <Select 
                  placeholder="Select Program" 
                  size="large"
                  onChange={handleFacultyChange}
                >
                  {Object.keys(programSubjects).map(key => (
                    <Option key={key} value={key}>{PROGRAM_LABELS[key] || key}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                name="subjects"
                label="Enrollment Subjects"
                rules={[{ required: true, message: 'Please select subjects' }]}
              >
                <Select 
                  mode="multiple" 
                  placeholder={availableSubjects.length > 0 ? "Select subjects" : "Select program first"} 
                  size="large"
                  disabled={availableSubjects.length === 0}
                >
                  {availableSubjects.map(sub => (
                    <Option key={sub} value={sub}>{sub}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Button
                type="primary"
                htmlType="submit"
                block
                size="large"
                loading={loading}
                disabled={images.length < MIN_IMAGES}
                style={{ 
                  marginTop: 30, 
                  height: 50, 
                  borderRadius: 10,
                  fontSize: 16,
                  fontWeight: 600
                }}
              >
                {images.length < MIN_IMAGES 
                  ? `Capture ${MIN_IMAGES - images.length} more photos` 
                  : 'Submit Registration'}
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}


