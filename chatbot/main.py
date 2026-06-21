from fastapi import FastAPI
from langchain_openai import ChatOpenAI
from langchain_core.messages import HumanMessage
import os

app = FastAPI()

llm = ChatOpenAI(
    temperature=0.7,
    openai_api_key=os.getenv("OPENAI_API_KEY")
)

@app.get("/")
def home():
    return {"message": "Chatbot running"}

@app.post("/chat")
def chat(query: str):
    response = llm([HumanMessage(content=query)])
    return {"response": response.content}