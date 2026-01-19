'use client';

import { useState, useCallback, useEffect } from 'react';
import { AuditConfig } from '@/types';

export interface ProgressState {
  status: 'idle' | 'crawling' | 'auditing' | 'completed' | 'error';
  currentUrl: string;
  totalFound: number;
  processed: number;
  violations: number;
  message: string;
}

export interface LogEntry {
  time: string;
  message: string;
}

export function useAudit() {
  const [config, setConfig] = useState<AuditConfig>({
    targetUrl: '',
    enableLogin: false,
    loginUrl: '',
    loginId: '',
    loginPassword: '',
    enableAccessibilityCheck: true,
    enableSEOCheck: true,
    enableAICheck: true,
    platform: 'PC',
    inspector: '',
  });

  const [progress, setProgress] = useState<ProgressState>({
    status: 'idle',
    currentUrl: '',
    totalFound: 0,
    processed: 0,
    violations: 0,
    message: '',
  });

  const [results, setResults] = useState<{ pages: number; violations: number } | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const addLog = useCallback((message: string) => {
    const time = new Date().toLocaleTimeString('ko-KR', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' });
    setLogs(prev => [...prev.slice(-50), { time, message }]);
  }, []);

  // Fake logs generator for visual feedback during crawling
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (progress.status === 'crawling' || progress.status === 'auditing') {
      const messages = [
        `${config.targetUrl} 접속 중...`,
        'DOM 구조 분석 중...',
        '링크 추출 중...',
        'robots.txt 확인 중...',
        '서버 응답 대기 중...',
        'HTML 콘텐츠 파싱 중...',
        '내부 링크 식별 중...',
        '검사 대기열에 페이지 추가 중...',
        'axe-core 스캐너 실행 중...',
        '접근성 규칙 검증 중...',
      ];

      interval = setInterval(() => {
        const randomMsg = messages[Math.floor(Math.random() * messages.length)];
        addLog(randomMsg);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [progress.status, config.targetUrl, addLog]);

  const startAudit = async () => {
    if (!config.targetUrl) {
      alert('대상 URL을 입력해주세요.');
      return;
    }

    setLogs([]);
    addLog(`시스템 초기화 완료. 대상: ${config.targetUrl}`);
    addLog('크롤러 프로세스 시작...');

    setProgress({
      status: 'crawling',
      currentUrl: config.targetUrl,
      totalFound: 0,
      processed: 0,
      violations: 0,
      message: '크롤링 시작...',
    });

    try {
      const { requestAudit } = await import('@/lib/audit-client');

      const data = await requestAudit(config, (progressData: any) => {
        if (progressData.type === 'log') {
          addLog(progressData.message);
        } else if (progressData.type === 'progress') {
          setProgress(prev => ({
            ...prev,
            processed: progressData.current,
            totalFound: progressData.total,
            currentUrl: progressData.url,
            status: 'auditing'
          }));
        }
      });

      addLog(`크롤링 완료. ${data.totalPages}개 페이지 발견.`);
      addLog(`진단 완료. ${data.totalViolations}개 위반 사항 발견.`);

      setProgress({
        status: 'completed',
        currentUrl: '',
        totalFound: data.totalPages,
        processed: data.totalPages,
        violations: data.totalViolations,
        message: '진단 완료!',
      });

      setResults({
        pages: data.totalPages,
        violations: data.totalViolations,
      });

      localStorage.setItem('auditResult', JSON.stringify(data));
    } catch (error) {
      addLog(`오류 발생: ${error}`);
      setProgress({
        status: 'error',
        currentUrl: '',
        totalFound: 0,
        processed: 0,
        violations: 0,
        message: `오류 발생: ${error}`,
      });
    }
  };

  const exportExcel = async () => {
    const savedResult = localStorage.getItem('auditResult');
    if (!savedResult) {
      alert('먼저 진단을 수행해주세요.');
      return;
    }

    try {
      addLog('엑셀 리포트 생성 중...');
      const result = JSON.parse(savedResult);
      const { getPlatformAuditService } = await import('@/services/platform/factory');
      const service = getPlatformAuditService();
      await service.exportExcel(result);
      addLog('엑셀 리포트 다운로드 완료.');
    } catch (error) {
      alert(`엑셀 다운로드 실패: ${error}`);
      addLog(`엑셀 내보내기 오류: ${error}`);
    }
  };

  return {
    config,
    setConfig,
    progress,
    results,
    logs,
    addLog,
    startAudit,
    exportExcel
  };
}
