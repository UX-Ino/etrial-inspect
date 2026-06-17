import { WebCrawler } from '../src/lib/crawler';

async function main() {
  // Test 1: Crawler with /eng excluded
  console.log('--- TEST 1: Exclude /eng ---');
  const customExcludePatterns1: RegExp[] = [new RegExp('\\/eng', 'i')];
  const crawler1 = new WebCrawler({
    maxPages: 20,
    excludePatterns: [
      /\.(jpg|jpeg|png|gif|svg|webp|ico|pdf|zip|exe|dmg)$/i,
      /logout/i,
      /delete/i,
      /signout/i,
      /#$/,
      /javascript:/i,
      /mailto:/i,
      /tel:/i,
      ...customExcludePatterns1
    ]
  });
  await crawler1.init();
  const res1 = await crawler1.crawl('https://www.lottegrs.com/');
  console.log('Excluded crawl visited pages:');
  res1.pages.forEach(p => console.log(' -', p.url));
  await crawler1.close();

  // Test 2: Crawler WITHOUT /eng excluded
  console.log('\n--- TEST 2: No /eng Excluded ---');
  const crawler2 = new WebCrawler({
    maxPages: 20,
    excludePatterns: [
      /\.(jpg|jpeg|png|gif|svg|webp|ico|pdf|zip|exe|dmg)$/i,
      /logout/i,
      /delete/i,
      /signout/i,
      /#$/,
      /javascript:/i,
      /mailto:/i,
      /tel:/i
    ]
  });
  await crawler2.init();
  const res2 = await crawler2.crawl('https://www.lottegrs.com/');
  console.log('No-exclude crawl visited pages:');
  res2.pages.forEach(p => console.log(' -', p.url));
  await crawler2.close();
}

main();
