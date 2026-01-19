import { IPlatformAuditService, WebAuditService } from './PlatformAuditService';

export function getPlatformAuditService(): IPlatformAuditService {
  return new WebAuditService();
}
