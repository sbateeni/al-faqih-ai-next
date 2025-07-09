import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1.2rem',
        fontSize: '3.2rem',
        fontWeight: 900,
        letterSpacing: '2px',
        background: 'linear-gradient(90deg, #0070f3 60%, #eab308 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        marginBottom: '1.2rem'
      }}>
        <img src="/moon.svg" alt="هلال" style={{width:'64px',height:'64px',verticalAlign:'middle', filter:'drop-shadow(0 2px 8px #0070f355)'}} />
        الفقيه AI
      </h1>
      <p style={{
        fontSize: '1.45rem',
        fontWeight: 600,
        color: '#222',
        letterSpacing: '1px',
        marginBottom: '2.2rem',
        textShadow: '0 1px 8px #eab30811'
      }}>
        نظام ذكاء اصطناعي للفتاوى الشرعية
      </p>
      <nav style={{ margin: '2rem 0' }}>
        <Link href="/madhahib" className={styles.madhhabLink + ' madhhab-link'} style={{fontSize:'1.45rem', fontWeight:800}}>
          <span className="madhhab-icon" style={{width:64, height:64, minWidth:64, minHeight:64, marginLeft:12, marginRight:4, boxShadow:'0 2px 12px #eab30833'}}>
            <img src="/book.svg" alt="كتاب" style={{ width: 38, height: 38 }} />
          </span>
          المذاهب الأربعة
        </Link>
        <Link href="/quran-sunnah" className={styles.quranLink + ' quran-link'} style={{fontSize:'1.45rem', fontWeight:800}}>
          <span className="quran-icon" style={{width:64, height:64, minWidth:64, minHeight:64, marginLeft:12, marginRight:4, boxShadow:'0 2px 12px #10b98133'}}>
            <img src="/quran.svg" alt="مصحف" style={{ width: 38, height: 38 }} />
          </span>
          القرآن والسنة
        </Link>
      </nav>
      <Link href="/api-key" style={{ color: '#0070f3', textDecoration: 'underline', fontSize:'1.1rem', fontWeight:700, marginTop:'2.5rem', display:'inline-block', letterSpacing:'1px' }}>
        أدخل مفتاح الـ API
      </Link>
    </main>
  );
}
