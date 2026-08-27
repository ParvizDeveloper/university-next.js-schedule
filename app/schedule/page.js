import { supabase } from '@/lib/supabase'

export const revalidate = 0; // Свежие данные при каждом запросе

export default async function SchedulePage() {
  const { data: schedule } = await supabase
    .from('schedule')
    .select('*')
    .order('created_at', { ascending: true })

  // Группируем пары по дням недели (например, "MONDAY")
  const groupedSchedule = schedule?.reduce((acc, item) => {
    const day = item.day_title;
    if (!acc[day]) {
      acc[day] = [];
    }
    acc[day].push(item);
    return acc;
  }, {}) || {};

  const days = Object.keys(groupedSchedule);

  return (
    <div className="page active">
      <div className="container">
        <div className="schedule-grid">
          {days.length > 0 ? (
            days.map((dayTitle) => (
              <div key={dayTitle} className="day-card">
                <h3 className="day-title">{dayTitle}</h3>
                
                {groupedSchedule[dayTitle].map((item) => (
                  <div key={item.id} className="lesson">
                    <span className="time">{item.time}</span>
                    <div className="info">
                      <div className="subject">{item.subject}</div>
                      <div className="meta">
                        {item.type && <span className="type">{item.type}</span>}
                        {item.teacher && <span>{item.teacher}</span>}
                        {item.room && <span>{item.room}</span>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p style={{ textAlign: 'center', opacity: 0.7, width: '100%' }}>
              Расписание пока не добавлено
            </p>
          )}
        </div>
      </div>
    </div>
  )
}