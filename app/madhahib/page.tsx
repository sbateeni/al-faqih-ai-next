import Link from 'next/link';
import AskForm from './AskForm';

const MADHAHIB = [
  { name: 'الحنفي', color: '#eab308' },
  { name: 'المالكي', color: '#10b981' },
  { name: 'الشافعي', color: '#3b82f6' },
  { name: 'الحنبلي', color: '#ef4444' },
  { name: 'جميع المذاهب', color: '#a21caf', all: true },
];

export default function Madhahib() {
  return (
    <main style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>المذاهب الأربعة</h1>
      <p>اختر أحد المذاهب وتحدث معه مباشرة حول المسائل الفقهية.</p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center', margin: '2rem 0' }}>
        {MADHAHIB.map((madhhab) => (
          <div key={madhhab.name} style={{ minWidth: 260, maxWidth: 340, background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px #0001', padding: '1.5rem 1rem', borderTop: `6px solid ${madhhab.color}` }}>
            <h2 style={{ color: madhhab.color, marginBottom: 8 }}>{madhhab.name}</h2>
            <AskForm madhhab={madhhab.all ? 'جميع المذاهب' : madhhab.name} />
            {madhhab.all && (
              <div style={{fontSize:'0.95rem',color:'#666',marginTop:8}}>سيتم عرض الإجابة من جميع المذاهب الأربعة</div>
            )}
          </div>
        ))}
      </div>
      <Link href="/">العودة للرئيسية</Link>
    </main>
  );
} 