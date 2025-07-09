import Link from 'next/link';
import AskForm from './AskForm';

export default function Madhahib() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>المذاهب الأربعة</h1>
      <p>استشر المذاهب الأربعة في المسائل الفقهية واحصل على الفتاوى من مصادرها الأصلية.</p>
      <AskForm />
      <Link href="/">العودة للرئيسية</Link>
    </main>
  );
} 