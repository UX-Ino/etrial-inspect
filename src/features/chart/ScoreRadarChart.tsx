'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import styles from './ScoreRadarChart.module.css';

interface ScoreRadarChartProps {
  accessibility?: number;  // 접근성 점수
  seo?: number;            // SEO 점수
  aiOptimization?: number; // AI 친화도 점수
  performance?: number;    // 성능 (선택사항)
  security?: number;       // 보안 (선택사항)
}

/**
 * 점수 Radar Chart 컴포넌트
 */
export default function ScoreRadarChart({
  accessibility = 0,
  seo = 0,
  aiOptimization = 0,
  performance = 0,
  security = 0,
}: ScoreRadarChartProps) {
  const data = [
    { subject: '접근성', value: accessibility, fullMark: 100 },
    { subject: 'SEO', value: seo, fullMark: 100 },
    { subject: 'AI친화도', value: aiOptimization, fullMark: 100 },
  ];

  // 성능/보안 점수가 제공된 경우 추가
  if (performance > 0) {
    data.push({ subject: '성능', value: performance, fullMark: 100 });
  }
  if (security > 0) {
    data.push({ subject: '보안', value: security, fullMark: 100 });
  }

  return (
    <section className={styles.container}>
      <h3 className={styles['chart-title']}>
        📊 종합 점수 대시보드
      </h3>

      <ResponsiveContainer width="100%" height="90%">
        <RadarChart data={data}>
          <PolarGrid stroke="#444" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#fff', fontSize: 14 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 100]}
            tick={{ fill: '#aaa', fontSize: 12 }}
          />
          <Radar
            name="점수"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            fillOpacity={0.6}
          />
        </RadarChart>
      </ResponsiveContainer>

      {/* 범례 */}
      <div className={styles.legend}>
        {accessibility > 0 && <div>접근성: {accessibility}/100</div>}
        {seo > 0 && <div>SEO: {seo}/100</div>}
        {aiOptimization > 0 && <div>AI친화도: {aiOptimization}/100</div>}
        {performance > 0 && <div>성능: {performance}/100</div>}
        {security > 0 && <div>보안: {security}/100</div>}
      </div>
    </section>
  );
}
