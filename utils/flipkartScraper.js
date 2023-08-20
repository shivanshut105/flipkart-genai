import puppeteer from "puppeteer-core";

export async function scrapeProducts(searchTerm) {
  const browser = await puppeteer.connect({
    browserWSEndpoint: `wss://chrome.browserless.io?token=${process.env.BLESS_TOKEN}`,
  });
  const page = await browser.newPage();
  console.log("searchTerm", searchTerm);
  const searchUrl = `https://www.flipkart.com/search?q=${searchTerm}`;

  const data = await page.evaluate(() => {
    const elements = Array.from(
      document.querySelectorAll("div._1xHGtK._373qXS")
    );

    return elements.map((element) => {
      const imgElement = element.querySelector("img._2r_T1I");
      const imgSrc = imgElement ? imgElement.src : null;

      const innerDiv = element.querySelector("div._2B099V");
      const nameAnchor = innerDiv.querySelector("a");
      const productName = nameAnchor ? nameAnchor.title : null;
      const productLink = nameAnchor ? nameAnchor.href : null;
      return {
        name: productName,
        image: imgSrc,
        link: productLink,
      };
    });
  });

  await browser.close();
  console.log(data.slice(4, 7));
  return data.slice(4, 7);
}
