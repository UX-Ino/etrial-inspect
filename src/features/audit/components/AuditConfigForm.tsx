import { AuditConfig } from '@/types';
import styles from '@/app/page.module.css';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import React from 'react';

interface AuditConfigFormProps {
  config: AuditConfig;
  setConfig: (config: AuditConfig) => void;
  onStart: () => void;
  onGitHubStart?: () => void;
  isProcessing: boolean;
}

export const AuditConfigForm = ({ config, setConfig, onStart, onGitHubStart, isProcessing }: AuditConfigFormProps) => {
  const handleKeyDownToggle = (e: React.KeyboardEvent, callback: () => void) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      callback();
    }
  };

  return (
    <Card className={styles.card} title="진단 설정">
      <div className="form-group">
        <label htmlFor="target-url-input">대상 URL *</label>
        <input
          id="target-url-input"
          type="url"
          placeholder="https://example.com"
          value={config.targetUrl}
          onChange={(e) => setConfig({ ...config, targetUrl: e.target.value })}
        />
      </div>

      <div className="form-group">
        <label htmlFor="exclude-paths-input">제외할 경로 (쉼표로 구분)</label>
        <input
          id="exclude-paths-input"
          type="text"
          placeholder="예: /eng, /m"
          value={config.excludePaths || ''}
          onChange={(e) => setConfig({ ...config, excludePaths: e.target.value })}
        />
      </div>

      <div className="form-group">
        <div className="toggle-container">
          <span
            role="switch"
            aria-checked={config.enableLogin}
            aria-label="로그인 필요 여부 토글"
            tabIndex={0}
            className={`toggle ${config.enableLogin ? 'active' : ''}`}
            onClick={() => setConfig({ ...config, enableLogin: !config.enableLogin })}
            onKeyDown={(e) => handleKeyDownToggle(e, () => setConfig({ ...config, enableLogin: !config.enableLogin }))}
          />
          <label className={styles['no-margin']} onClick={() => setConfig({ ...config, enableLogin: !config.enableLogin })} style={{ cursor: 'pointer' }}>
            로그인 필요
          </label>
        </div>
      </div>

      {config.enableLogin && (
        <div className="form-group">
          <label htmlFor="login-url-input">로그인 URL</label>
          <input
            id="login-url-input"
            type="url"
            placeholder="https://example.com/login"
            value={config.loginUrl}
            onChange={(e) => setConfig({ ...config, loginUrl: e.target.value })}
          />
          <p className={styles['login-warning']} style={{ color: '#f04452', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500 }}>
            ⚠️ 검사가 시작되면 브라우저 창이 열립니다. 로그인 완료 후 <b>창을 닫아주세요</b>. 창을 닫으면 자동으로 검사가 시작됩니다.
          </p>
        </div>
      )}

      {/* 진단 항목 선택 */}
      <div className="form-group">
        <label className={styles['form-label']} style={{ fontWeight: 600, color: '#4e5968', marginBottom: '0.75rem' }}>진단 항목 선택</label>

        <div className="chip-group">
          {/* 웹접근성 */}
          <button
            type="button"
            role="checkbox"
            aria-checked={config.enableAccessibilityCheck}
            aria-label="웹접근성 자가 진단 토글"
            className={`chip-button ${config.enableAccessibilityCheck ? 'active' : ''}`}
            onClick={() => setConfig({ ...config, enableAccessibilityCheck: !config.enableAccessibilityCheck })}
            onKeyDown={(e) => handleKeyDownToggle(e, () => setConfig({ ...config, enableAccessibilityCheck: !config.enableAccessibilityCheck }))}
          >
            <div className="chip-title">
              {config.enableAccessibilityCheck && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              <span>웹접근성</span>
            </div>
            <div className="chip-subtitle">KWCAG 2.2</div>
          </button>

          {/* SEO 최적화 */}
          <button
            type="button"
            role="checkbox"
            aria-checked={config.enableSEOCheck}
            aria-label="SEO 최적화 진단 토글"
            className={`chip-button ${config.enableSEOCheck ? 'active' : ''}`}
            onClick={() => setConfig({ ...config, enableSEOCheck: !config.enableSEOCheck })}
            onKeyDown={(e) => handleKeyDownToggle(e, () => setConfig({ ...config, enableSEOCheck: !config.enableSEOCheck }))}
          >
            <div className="chip-title">
              {config.enableSEOCheck && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              <span>SEO 최적화</span>
            </div>
            <div className="chip-subtitle">Sitemap, Meta</div>
          </button>

          {/* AI 친화도 */}
          <button
            type="button"
            role="checkbox"
            aria-checked={config.enableAICheck}
            aria-label="AI 친화도 진단 토글"
            className={`chip-button ${config.enableAICheck ? 'active' : ''}`}
            onClick={() => setConfig({ ...config, enableAICheck: !config.enableAICheck })}
            onKeyDown={(e) => handleKeyDownToggle(e, () => setConfig({ ...config, enableAICheck: !config.enableAICheck }))}
          >
            <div className="chip-title">
              {config.enableAICheck && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              )}
              <span>AI 친화도</span>
            </div>
            <div className="chip-subtitle">llms.txt, GEO</div>
          </button>
        </div>
      </div>

      <div className={styles.row}>
        <div className="form-group">
          <label htmlFor="platform-select">플랫폼</label>
          <select
            id="platform-select"
            value={config.platform}
            onChange={(e) => setConfig({ ...config, platform: e.target.value as 'PC' | 'Mobile' })}
          >
            <option value="PC">PC</option>
            <option value="Mobile">Mobile</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="inspector-input">점검자</label>
          <input
            id="inspector-input"
            type="text"
            placeholder="이름 입력"
            value={config.inspector}
            onChange={(e) => setConfig({ ...config, inspector: e.target.value })}
          />
        </div>
      </div>

      <Button
        variant="primary"
        fullWidth
        onClick={onStart}
        disabled={isProcessing}
        isLoading={isProcessing}
        style={{ marginTop: '1rem', height: '52px', borderRadius: '14px', fontSize: '1.05rem' }}
      >
        {isProcessing ? '진행 중...' : '🚀 전수 검사 시작'}
      </Button>

      {onGitHubStart && (
        <Button
          variant="secondary"
          fullWidth
          onClick={onGitHubStart}
          disabled={isProcessing}
          style={{ marginTop: '0.75rem', height: '52px', borderRadius: '14px', fontSize: '1.05rem', backgroundColor: '#333d4b', color: 'white' }}
        >
          <span style={{ marginRight: '0.5rem' }}>⚡️</span>
          대규모 진단 (GitHub Actions)
        </Button>
      )}
    </Card>
  );
};
