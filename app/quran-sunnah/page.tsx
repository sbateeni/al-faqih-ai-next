import Link from 'next/link';
import AskForm from './AskForm';

export default function QuranSunnah() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1 style={{display:'flex',alignItems:'center',justifyContent:'center',gap:'0.5rem'}}>
        <img src="/quran.svg" alt="مصحف" style={{width:'28px',height:'28px',verticalAlign:'middle'}} />
        القرآن والسنة
      </h1>
      <p>ابحث في القرآن الكريم والسنة النبوية واحصل على الأدلة والتفاسير.</p>
      <AskForm />
      <Link href="/">العودة للرئيسية</Link>
    </main>
  );
} 