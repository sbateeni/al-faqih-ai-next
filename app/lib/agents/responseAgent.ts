export function formatAnswer(raw: string, mode?: 'short' | 'long' | 'separated') {
  const text = raw.trim();
  if (mode === 'separated') {
    // حاول فصل النقاط بناءً على فواصل الشطر أو علامات الترقيم
    const parts = text
      .split(/\n|\r|\.|؛|\n\n|\u2022|\u2023|\u25E6|\u2043/)
      .map(s => s.trim())
      .filter(Boolean);
    if (parts.length <= 1) return text;
    return parts.map((p, i) => `${i + 1}. ${p}`).join('\n');
  }
  // لنسهل القراءة في الوضع القصير نأخذ الفقرة الأولى
  if (mode === 'short') {
    const first = text.split(/\n\n|\n/)[0];
    return first;
  }
  return text; // طويل أو افتراضي
}
