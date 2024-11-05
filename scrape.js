const puppeteer = require('puppeteer');

const urls = {
  sufyan: 'https://www.launchgood.com/v4/campaign/shave_sufyan_cw_dinner?src=3320203&tpclid=facebook.PAZXh0bgNhZW0CMTEAAab9oEBf1_4lmSEJ45FTtu6EaU_Bb0W2kjtaKcN6jpxbMEjW-ZRTHbKOc9U_aem_U4Y4ezjMpsdUZcgleAfkVw',
  moiz: 'https://www.launchgood.com/v4/campaign/shave_moiz_cw_dinner?src=3320203&tpclid=facebook.PAZXh0bgNhZW0CMTEAAab9oEBf1_4lmSEJ45FTtu6EaU_Bb0W2kjtaKcN6jpxbMEjW-ZRTHbKOc9U_aem_U4Y4ezjMpsdUZcgleAfkVw'
};

const delay = (milliseconds) => new Promise(resolve => setTimeout(resolve, milliseconds));

async function fetchDonationAmount(url) {
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle2' });
    await delay(5000);

    const donationAmount = await page.evaluate(() => {
      const element = document.querySelector('div.text-2xl.lg\\:text-5xl.lg\\:font-semibold.text-rebuild-primary.lg\\:mb-2.font-bold.me-1');
      if (element) {
        const amountSpan = element.querySelectorAll('span')[1];
        return amountSpan ? amountSpan.innerText : null;
      }
      return null;
    });

    return donationAmount ? parseFloat(donationAmount) : null;

  } catch (error) {
    console.error(`Error fetching donation amount:`, error);
    return null;
  } finally {
    await browser.close();
  }
}

// Run the functions for both campaigns and output JSON
(async () => {
  const sufyanAmount = await fetchDonationAmount(urls.sufyan);
  const moizAmount = await fetchDonationAmount(urls.moiz);

  const result = {
    sufyan: sufyanAmount,
    moiz: moizAmount
  };

  // Only output the JSON result, no additional logging
  console.log(JSON.stringify(result));
})();
