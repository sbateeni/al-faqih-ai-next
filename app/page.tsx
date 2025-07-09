import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <h1 style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem'}}>
        <img src="/moon.svg" alt="هلال" style={{width:'32px',height:'32px',verticalAlign:'middle'}} />
        الفقيه AI
      </h1>
      <p>نظام ذكاء اصطناعي للفتاوى الشرعية</p>
      <nav style={{ margin: '2rem 0' }}>
        <Link href="/madhahib" className={styles.madhhabLink + ' madhhab-link'}>
          <span className="madhhab-icon">
            <img src="/book.svg" alt="كتاب" style={{ width: 20, height: 20 }} />
          </span>
          المذاهب الأربعة
        </Link>
        <Link href="/quran-sunnah" className={styles.quranLink + ' quran-link'}>
          <span className="quran-icon">
            <img src="/quran.svg" alt="مصحف" style={{ width: 20, height: 20 }} />
          </span>
          القرآن والسنة
        </Link>
      </nav>
      <Link href="/api-key" style={{ color: '#0070f3', textDecoration: 'underline' }}>
        أدخل مفتاح الـ API
      </Link>
    </main>
  );
}
