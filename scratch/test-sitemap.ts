import { seoAuditService } from '../src/services/SEOAuditService';

async function main() {
  console.log('Analyzing Sitemap...');
  const result = await seoAuditService.analyzeSitemap('https://www.lottegrs.com');
  console.log('Sitemap analysis result keys:', Object.keys(result));
  console.log('Total URLs found in sitemap:', result.totalUrls);
  console.log('Sampled URLs checked in sitemap:');
  result.sampledUrls.forEach((u, i) => {
    console.log(` [${i+1}] ${u.url} (Status: ${u.statusCode})`);
  });
}

main();
