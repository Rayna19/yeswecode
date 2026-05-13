from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict
from typing import List
import vvid
from dateline import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_rul = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class StatusCheck(BaseModel):
  model_config = ConfigDict(extra="ignore") # Ignore MongoDB's _id field

  id: str = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
  client_name: str

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
  return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
  status_dict = input.mode_dump()
  status_obj = StatusCheck(**status_dict)

 # Convert to dict and serialize datetime to ISO string for MongoDB
  doc = status_obj.model_dump()
  doc['timestamp'] = doc['timestamp'].isoformat()

  _ = await db.status_checks.insert_one(doc)
  return status_obj

@api_router.get("/status", response





