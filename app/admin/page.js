'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPage() {
  const [password, setPassword] = useState('')
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [scheduleList, setScheduleList] = useState([])
  const [editingId, setEditingId] = useState(null)

  const [formData, setFormData] = useState({
    day_title: 'MONDAY',
    time: '',
    subject: '',
    type: 'Lecture',
    teacher: '',
    room: '',
  })
  const [status, setStatus] = useState({ type: '', msg: '' })

  // Загрузка расписания
  const fetchSchedule = async () => {
    const { data } = await supabase
      .from('schedule')
      .select('*')
      .order('id', { ascending: true })
    if (data) setScheduleList(data)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchSchedule()
    }
  }, [isAuthenticated])

  const handleLogin = (e) => {
    e.preventDefault()
    if (password) setIsAuthenticated(true)
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleEdit = (item) => {
    setEditingId(item.id)
    setFormData({
      day_title: item.day_title,
      time: item.time,
      subject: item.subject,
      type: item.type || '',
      teacher: item.teacher || '',
      room: item.room || '',
    })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const cancelEdit = () => {
    setEditingId(null)
    setFormData({
      day_title: 'MONDAY',
      time: '',
      subject: '',
      type: 'Lecture',
      teacher: '',
      room: '',
    })
  }

  const handleDelete = async (id) => {
    if (!confirm('Удалить эту пару из расписания?')) return

    setStatus({ type: 'info', msg: 'Удаление...' })
    try {
      const res = await fetch('/api/schedule', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, id }),
      })
      const result = await res.json()
      if (!res.ok) throw new Error(result.error)

      setStatus({ type: 'success', msg: 'Занятие удалено' })
      fetchSchedule()
    } catch (err) {
      setStatus({ type: 'error', msg: err.message })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus({ type: 'info', msg: 'Сохранение...' })

    const method = editingId ? 'PUT' : 'POST'
    const payload = editingId ? { ...formData, id: editingId, password } : { ...formData, password }

    try {
      const res = await fetch('/api/schedule', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await res.json()
      if (!res.ok) throw new Error(result.error)

      setStatus({
        type: 'success',
        msg: editingId ? 'Занятие обновлено!' : 'Занятие добавлено!',
      })
      cancelEdit()
      fetchSchedule()
    } catch (err) {
      setStatus({ type: 'error', msg: err.message })
    }
  }

  if (!isAuthenticated) {
    return (
      <div className="page active" style={{ padding: '40px 20px' }}>
        <div className="container" style={{ maxWidth: '400px', margin: '0 auto' }}>
          <h2 className="title">ADMIN LOGIN</h2>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="password"
              placeholder="Введите пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={inputStyle}
              required
            />
            <button type="submit" style={btnPrimaryStyle}>
              Войти
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="page active" style={{ padding: '40px 20px' }}>
      <div className="container" style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h2 className="title">{editingId ? 'EDIT ITEM' : 'ADD SCHEDULE ITEM'}</h2>

        {status.msg && (
          <p style={{ color: status.type === 'error' ? '#ff4d4d' : '#00ff88', marginBottom: '15px', textAlign: 'center' }}>
            {status.msg}
          </p>
        )}

        {/* ФОРМА СОЗДАНИЯ / РЕДАКТИРОВАНИЯ */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '50px' }}>
          <label>
            День недели / Заголовок:
            <input type="text" name="day_title" placeholder="MONDAY" value={formData.day_title} onChange={handleChange} required style={inputStyle} />
          </label>

          <label>
            Время:
            <input type="text" name="time" placeholder="09:00 - 10:20" value={formData.time} onChange={handleChange} required style={inputStyle} />
          </label>

          <label>
            Предмет:
            <input type="text" name="subject" placeholder="Web Development" value={formData.subject} onChange={handleChange} required style={inputStyle} />
          </label>

          <label>
            Тип занятия:
            <input type="text" name="type" placeholder="Lecture / Practice" value={formData.type} onChange={handleChange} style={inputStyle} />
          </label>

          <label>
            Преподаватель:
            <input type="text" name="teacher" placeholder="John Doe" value={formData.teacher} onChange={handleChange} style={inputStyle} />
          </label>

          <label>
            Кабинет / Аудитория:
            <input type="text" name="room" placeholder="Room 304" value={formData.room} onChange={handleChange} style={inputStyle} />
          </label>

          <div style={{ display: 'flex', gap: '10px' }}>
            <button type="submit" style={btnPrimaryStyle}>
              {editingId ? 'Сохранить изменения' : 'Добавить в расписание'}
            </button>
            {editingId && (
              <button type="button" onClick={cancelEdit} style={btnCancelStyle}>
                Отмена
              </button>
            )}
          </div>
        </form>

        {/* СПИСОК СУЩЕСТВУЮЩИХ ПАР */}
        <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', borderBottom: '1px solid var(--primary)' }}>
          ТЕКУЩЕЕ РАСПИСАНИЕ
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {scheduleList.length > 0 ? (
            scheduleList.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'rgba(255,255,255,0.05)',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                <div>
                  <strong style={{ color: 'var(--primary)' }}>{item.day_title}</strong> | {item.time}
                  <div style={{ fontSize: '1.2rem', marginTop: '4px' }}>{item.subject} ({item.room || 'без кабинета'})</div>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button onClick={() => handleEdit(item)} style={btnEditStyle}>
                    <i className="fas fa-edit"></i>
                  </button>
                  <button onClick={() => handleDelete(item.id)} style={btnDeleteStyle}>
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p style={{ opacity: 0.6 }}>Расписание пусто</p>
          )}
        </div>
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '10px',
  marginTop: '5px',
  borderRadius: '6px',
  border: '1px solid rgba(255,255,255,0.2)',
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
}

const btnPrimaryStyle = {
  flex: 1,
  padding: '14px',
  borderRadius: '8px',
  background: 'var(--primary)',
  color: '#fff',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
}

const btnCancelStyle = {
  padding: '14px 20px',
  borderRadius: '8px',
  background: '#555',
  color: '#fff',
  fontWeight: 'bold',
  cursor: 'pointer',
}

const btnEditStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  background: '#ffaa00',
  color: '#000',
  border: 'none',
  cursor: 'pointer',
}

const btnDeleteStyle = {
  padding: '8px 12px',
  borderRadius: '6px',
  background: '#ff4d4d',
  color: '#fff',
  border: 'none',
  cursor: 'pointer',
}