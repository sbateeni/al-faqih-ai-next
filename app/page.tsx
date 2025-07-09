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
        <Link href="/madhahib" style={{ margin: '0 1rem' }}>المذاهب الأربعة</Link>
        <Link href="/quran-sunnah" style={{ margin: '0 1rem' }}>القرآن والسنة</Link>
      </nav>
      <Link href="/api-key" style={{ color: '#0070f3', textDecoration: 'underline' }}>
        أدخل مفتاح الـ API
      </Link>
    </main>
  );
}
