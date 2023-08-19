import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "langchain/llms/openai";
import { PromptTemplate } from "langchain/prompts";
import { LLMChain, SimpleSequentialChain } from "langchain/chains";

// functions 
const ProcessQuery = async(query) =>{
  const llm = new OpenAI({ temperature: 0.9});
  // templates
  const baseTemplate = new PromptTemplate({
    template:"Provide fashion advice for give outfit. Given a specific clothing item, recommend the top 4 compatible items for a stylish outfit, followed by 2 accessory suggestions. outfit : {outfit}",
    inputVariables: ["outfit"],
  });
  const finalTemplate = new PromptTemplate({
    template:"Add all the clothing or accessories from this description and return it as an array of strings, description : {description}",
    inputVariables: ["description"],
  });
  
  // chains
  const baseChain = new LLMChain({ llm, prompt: baseTemplate, verbose: true });
  const finalChain = new LLMChain({ llm, prompt: finalTemplate, verbose: true });
  const overallChain = new SimpleSequentialChain({
    chains: [baseChain, finalChain],
    verbose: true,
  });

  let response;
  if(query){
    response = await overallChain.run(query);
  }
  console.log(response);
}

// routes
export async function POST(request, response) {
  try {
    const { query } = await request.json();
    // console.log(query);
    ProcessQuery(query);
    return NextResponse.json({ message: "Success" }); // Sending a response back
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