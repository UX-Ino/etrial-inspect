import { ReportViewer } from '@/features/report/components/ReportViewer';
import { NotionService } from '@/services/notion/NotionService';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: PageProps) {
  const { id } = await params;

  if (!process.env.NOTION_API_KEY || !process.env.NOTION_DATABASE_ID) {
    return <div>Error: Notion configuration missing</div>;
  }

  const notionService = new NotionService(
    process.env.NOTION_API_KEY,
    process.env.NOTION_DATABASE_ID
  );

  const auditResult = await notionService.getAuditResult(id);

  if (!auditResult) {
    notFound();
  }

  return <ReportViewer initialResult={auditResult} />;
}
