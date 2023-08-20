import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";
import { scrapeProducts } from "@/utils/flipkartScraper";

// functions
const ProcessQuery = async (query) => {
  const llm = new OpenAI({ temperature: 0.9 });
  // templates
  const baseTemplate = new PromptTemplate({
    template:
      "Provide fashion advice for give outfit. Given a specific clothing item, recommend the top 4 compatible items for a stylish outfit, followed by 2 accessory suggestions. outfit : {outfit}",
    inputVariables: ["outfit"],
  });
  const finalTemplate = new PromptTemplate({
    template:
      "Add all the clothing or accessories from this description and return it as an array of strings, description : {description}. The return type of response should be an array.",
    inputVariables: ["description"],
  });

  // chains
  const baseChain = new LLMChain({ llm, prompt: baseTemplate, verbose: true });
  const finalChain = new LLMChain({
    llm,
    prompt: finalTemplate,
    verbose: true,
  });
  const overallChain = new SimpleSequentialChain({
    chains: [baseChain, finalChain],
    verbose: true,
  });
  // ProcessQuery;

  let response;
  if (query) {
    response = await overallChain.run(query);
    var cleanedString = response.trim().replace(/^\s*['"]?|['"]?\s*$/g, "");
    try {
      const parsedArray = JSON.parse(cleanedString);
      console.log("response", typeof parsedArray, parsedArray);
      return parsedArray;
    } catch (err) {
      console.log("Parsing error", err);
      return [];
    }
  }
  console.log("[llChain] query Not Found", response);
  return response;
};

const ProcessItemsArray = async (itemsArray) => {
  const resultObject = {};

  try {
    const promises = itemsArray.map(async (item) => {
      try {
        console.log("Scraping for item", item);
        const itemResults = await scrapeProducts(item);
        resultObject[item] = itemResults;
      } catch (error) {
        console.error(`Error scraping for item ${item}:`, error);
        resultObject[item] = "Error occurred during scraping.";
      }
    });

    // Wait for all promises to resolve before returning the resultObject
    await Promise.all(promises);

    console.log("[scrape] resultObject", resultObject);
    return resultObject;
  } catch (error) {
    console.error("Error in ProcessItemsArray:", error);
    throw error;
  }
};

// routes
export async function POST(request, response) {
  try {
    const { query } = await request.json();
    console.log(query);
    let itemsArray = await ProcessQuery(query);

    // Process the items array and send the response once it's done
    try {
      // const resultArray = [];
      const resultObject = await ProcessItemsArray(itemsArray);
      console.log("ProcessItemsArray result:", resultObject);
      // resultArray.push(resultObject);
      return NextResponse.json({ message: "Success", data: resultObject });
    } catch (error) {
      console.error("ProcessItemsArray error:", error);
      return NextResponse.json({ error: "An error occurred" }, { status: 500 });
    }
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}

export function GET(request) {
  try {
    console.log("GET request received");
    return NextResponse.json({ message: "GET request received" });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "An error occurred" }, { status: 500 });
  }
}
