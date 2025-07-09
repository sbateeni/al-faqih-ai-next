import './globals.css';
import { ReactNode } from 'react';
import Link from 'next/link';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <meta charSet="utf-8" />
        <title>الفقيه AI</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;700&display=swap" rel="stylesheet" />
        <style>{`body { font-family: 'Cairo', sans-serif; }`}</style>
      </head>
      <body>
        <header className="navbar">
          <div className="logo-area">
            <img src="/book.svg" alt="شعار الفقيه" className="logo-icon" />
            <span className="logo-text">الفقيه <span style={{color:'#0070f3'}}>AI</span></span>
            <img src="/moon.svg" alt="هلال" className="moon-icon" style={{marginRight: '8px', width: '28px', height: '28px'}} />
          </div>
          <nav>
            <Link href="/">الرئيسية</Link>
            <Link href="/madhahib">المذاهب الأربعة</Link>
            <Link href="/quran-sunnah"><img src="/quran.svg" alt="مصحف" style={{verticalAlign:'middle',width:'22px',height:'22px',marginLeft:'4px'}} />القرآن والسنة</Link>
            <Link href="/api-key">مفتاح API</Link>
          </nav>
        </header>
        <div className="content-area">
          {children}
        </div>
        <footer className="footer-bar">
          <span>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} الفقيه AI</span>
        </footer>
      </body>
    </html>
  );
}
