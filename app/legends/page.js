export default function LegendsPage() {
  const legends = [
    { name: 'Aziz Turgunov (LEGEND)', link: 'https://t.me/Aziz_Turgunow', tag: '@Aziz_Turgunow' },
    { name: 'Shakhina Ambassador', link: 'https://t.me/shaxinashokirova', tag: '@shaxinashokirova' },
    { name: 'Paranoia', link: 'https://t.me/prnoia_0', tag: '@prnoia_0' },
    { name: 'Tigran', link: 'https://t.me/Tgrn1337', tag: '@Tgrn1337' },
    { name: 'Dilnura', link: 'https://t.me/dilunara8', tag: '@dilunara8' },
    { name: 'Asliddin', link: 'https://realasliddin', tag: '@realasliddin' },
    { name: 'Abdurashid', link: 'https://t.me/abdulrash1d', tag: '@abdulrash1d' },
    { name: 'Ibrokhim', link: 'https://t.me/ibroxim2412', tag: '@ibroxim2412' },
    { name: 'Twin', link: 'https://FellTarnished', tag: '@FellTarnished' },
    { name: 'Xabibullo', link: 'https://t.me/mixbrendmensunderwear', tag: '@mixbrendm...' },
    { name: 'Shoxjaxon', link: '#', tag: 'no name' },
    { name: 'Hojiakbar', link: 'https://t.me/hojiakbarisrofilov', tag: '@hojiakbarisrofilov' },
    { name: 'Kevin', link: 'https://t.me/muhammadlyusuf', tag: '@muhammadlyusuf' },
    { name: 'Suxrob', link: 'https://t.me/Nurid1novic', tag: '@Nurid1novic' },
    { name: 'Laylo', link: 'https://t.me/laylo_pardayeva', tag: '@laylo_pardayeva' },
    { name: 'Muslima', link: 'https://t.me/bakhodirovnams', tag: '@bakhodirovnams' },
    { name: 'Wiz', link: 'https://t.me/kagetsu07', tag: '@kagetsu07' },
    { name: 'Abror', link: 'https://t.me/I_am_a_student', tag: '@I_am_a_student' },
    { name: 'Nabiyev', link: 'https://t.me/Freeesco07', tag: '@Freeesco07' },
  ]

  return (
    <div className="page active">
      <div className="container">
        <h2 className="title">LEGENDS OF IT104</h2>
        <div className="legends-grid">
          {legends.map((item, index) => (
            <div key={index} className="legend-card">
              <h3>{item.name}</h3>
              <a href={item.link} target="_blank" rel="noreferrer">
                {item.tag}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}