from fastapi import FastAPI
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

# Configure ChatOpenAI to route through OpenRouter
llm = ChatOpenAI(
    openai_api_base="https://openrouter.ai/api/v1",  # 👈 Points LangChain to OpenRouter
    model="openai/gpt-oss-120b:free",               # 👈 The specific model slug
    openai_api_key=os.getenv("CHATBOT_API_KEY"),
    temperature=0.7,
    # OpenRouter recommends passing these optional headers to track rankings
    model_kwargs={
        "extra_headers": {
            "HTTP-Referer": "http://localhost:8000", 
            "X-Title": "FastAPI LangChain Bot"
        }
    }
)

@app.get("/")
def home():
    return {"message": "Chatbot running"}

@app.post("/chat")
def chat(query: str):
    response = llm.invoke([HumanMessage(content=query)])
    return {"response": response.content}