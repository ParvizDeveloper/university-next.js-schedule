export default function ContactPage() {
  return (
    <div className="page active">
      <div className="container">
        <h2 className="title">CONTACT</h2>
        <div className="contact-card">
          <h3 style={{ fontSize: '3rem', color: 'var(--primary)' }}>Our team is Here</h3>
          <p style={{ fontSize: '2rem', margin: '40px 0' }}>
            BUGs, ideas, memes, pictures — send it us now
          </p>
          <div style={{ marginTop: '50px' }}>
            <p style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
              <strong>Website made by</strong>
            </p>
            <a
              href="https://t.me/prnoia_0"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--secondary)', fontSize: '4rem', fontWeight: 900 }}
            >
              Parviz
            </a>
            <p style={{ marginTop: '20px', fontSize: '2rem' }}>Ambassador </p>
            <a
              href="https://t.me/shaxinashokirova"
              target="_blank"
              rel="noreferrer"
              style={{ color: 'var(--secondary)', fontSize: '4rem', fontWeight: 900 }}
            >
              Shakhina
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}