from fastapi import FastAPI
from langchain_openai import ChatOpenAI
from langchain_core.prompts import PromptTemplate
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from pydantic import BaseModel
from dotenv import load_dotenv
import os

load_dotenv()

api_key = os.getenv("PERP_API_KEY") 
base_url = os.getenv("PERP_BASE_URL")
model = ChatOpenAI(
    model="sonar",
    api_key=api_key,
    base_url= base_url
)

template_message = "\n".join(
    ["# System",
    "You are a chief agent that accepts an ingredients and make a recipe from it. Produce an JSX output that formats the recipe into a well-structured HTML dont include introduction or conclusion",
    "# User",
    "Here is my ingredients suggest a recipe for it",
    "{ingredient}",
    "## Recipe Language",
    "your output recipe must be only in {language}",
    "## Output",
    "```jsx"]
)
RLE = "\u202B"
PDF = "\u202C"


prompt_template = PromptTemplate(
    template=template_message,
    input_variables=["ingredient","language"]
 )


app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class Ingredients(BaseModel):
    items:List[str]



stored_ingredients: List[str] = []

@app.post("/get-recipe")
async def get_recipe_from_ingredients(ingredients: Ingredients):
    ingredient_str = ", ".join(ingredients.items)
    ingredient_str = f"{RLE}{ingredient_str}{PDF}"
    prompt = prompt_template.format(ingredient=ingredient_str, language="Arabic")
    response = model.invoke(prompt)
    html_response = response.content.replace("```jsx", "").replace("```", "").replace("\n", "")
    return {"recipe": html_response}


