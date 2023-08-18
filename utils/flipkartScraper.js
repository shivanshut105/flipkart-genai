import puppeteer from "puppeteer";

export async function scrapeProducts(searchTerm) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  const searchUrl = `https://www.flipkart.com/search?q=${searchTerm}`;

  await page.goto(searchUrl);

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
        productName: productName,
        imgSrc: imgSrc,
        productLink: productLink,
      };
    });
  });

  console.log(data.slice(4, 9));

  await browser.close();
}
