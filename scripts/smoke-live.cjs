const puppeteer = require('puppeteer-core');

(async () => {
  const base = 'https://haidershish.github.io/sufi-meditation-quranic-guidance-tarot-app';
  const browser = await puppeteer.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    headless: true,
    args: ['--no-sandbox', '--disable-gpu'],
  });
  const page = await browser.newPage();
  const errors = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await page.goto(`${base}/`, { waitUntil: 'networkidle0' });
  const clickButton = async label => {
    const found = await page.$$eval('button', (buttons, wanted) => {
      const b = buttons.find(x => x.getAttribute('aria-label') === wanted);
      if (!b) return { found: false, labels: buttons.map(x => x.getAttribute('aria-label')) };
      b.click();
      return { found: true, labels: [] };
    }, label);
    if (!found.found) throw new Error(`button ${label} absent; labels=${found.labels.join(',')}`);
  };

  console.log('home url', page.url(), 'body', (await page.evaluate(() => document.body.innerText)).slice(0, 500), 'buttons', await page.$$eval('button', bs => bs.map(b => b.getAttribute('aria-label'))), 'errors', errors);
  for (const text of ['Meditation', 'Tarot', 'Quranic Guidance']) {
    if (!(await page.evaluate((label) => document.body.innerText.includes(label), text))) throw new Error(`missing home track: ${text}`);
  }
  await clickButton('Choose a spread');
  await page.waitForFunction(() => document.body.innerText.includes('Your question'));
  if (!page.url().includes('/sufi-contemplative-tarot-app/draw')) throw new Error(`bad draw URL ${page.url()}`);
  const drawText = await page.evaluate(() => document.body.innerText);
  for (const text of ['Clarity for today', 'A decision', 'A relationship']) {
    if (!drawText.includes(text)) throw new Error(`missing suggested set: ${text}`);
  }

  const radios = await page.$$('[role="radio"]');
  if (!radios.length) throw new Error('custom-question radios absent');
  await radios[radios.length - 1].click();
  await page.waitForFunction(() => document.querySelectorAll('textarea, input').length >= 2);
  await page.evaluate(() => {
    const fields = [...document.querySelectorAll('textarea, input')];
    const set = (el, value) => {
      const setter = Object.getOwnPropertyDescriptor(el.constructor.prototype, 'value').set;
      setter.call(el, value);
      el.dispatchEvent(new Event('input', { bubbles: true }));
    };
    set(fields[0], 'What am I avoiding?');
    set(fields[1], 'Respond with courage');
  });
  await clickButton('Draw');
  await page.waitForFunction(() => document.body.innerText.includes('Meditate on image'));
  if (!page.url().includes('/sufi-contemplative-tarot-app/draw/session')) throw new Error(`bad session URL ${page.url()}`);
  const before = await page.evaluate(() => document.body.innerText);
  if (!before.includes('What am I avoiding?') || !before.includes('Respond with courage')) throw new Error('question/intention missing at top');

  await clickButton('Meditate on image');
  await page.waitForFunction(() => document.body.innerText.includes('Observe without naming or interpreting yet'));
  await clickButton('Close image');
  await clickButton('Reveal (1 left)');
  await page.waitForFunction(() => document.body.innerText.includes('Read & reflect'));
  await page.$eval('button[aria-label^="Enlarge "]', b => b.click());
  await page.waitForFunction(() => document.body.innerText.includes('Tap Close when you are ready'));
  await clickButton('Close image');
  await page.evaluate(() => {
    const field = [...document.querySelectorAll('textarea, input')].at(-1);
    const setter = Object.getOwnPropertyDescriptor(field.constructor.prototype, 'value').set;
    setter.call(field, 'A saved reflection');
    field.dispatchEvent(new Event('input', { bubbles: true }));
  });
  await clickButton('Save reading');
  await new Promise(r => setTimeout(r, 2000));
  console.log('after-save url', page.url(), 'body', (await page.evaluate(() => document.body.innerText)).slice(-800));
  await page.waitForFunction(() => location.pathname.includes('/journal/') && document.body.innerText.includes('YOUR QUESTION'), { timeout: 15000 });
  const saved = await page.evaluate(() => document.body.innerText);
  if (!saved.includes('What am I avoiding?') || !saved.includes('Respond with courage')) {
    throw new Error('saved reading lost question or intention');
  }

  console.log(JSON.stringify({
    home: true,
    drawUrl: `${base}/draw`,
    suggestions: 3,
    customQuestionSavedIntoDraft: true,
    intentionAtTop: true,
    meditationPreviewBeforeReveal: true,
    zoomAfterReveal: true,
    savedReadingRetainsQuestionAndIntention: true,
    consoleErrors: errors,
  }, null, 2));
  await browser.close();
})().catch(err => { console.error(err); process.exit(1); });
