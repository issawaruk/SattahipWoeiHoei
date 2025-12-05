from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()

# Path ตัวจริงบน Vercel ต้องอ้างแบบ absolute
BASE_DIR = os.path.dirname(os.path.abspath(__file__))  # /api

STATIC_DIR = os.path.join(BASE_DIR, "..", "static")
TEMPLATE_DIR = os.path.join(BASE_DIR, "..", "templates")

# Static
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

# Templates
templates = Jinja2Templates(directory=TEMPLATE_DIR)


@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    return templates.TemplateResponse("index.html", {"request": request})


@app.get("/attractions", response_class=HTMLResponse)
def attractions(request: Request):
    return templates.TemplateResponse("attractions.html", {"request": request})


@app.get("/cafe", response_class=HTMLResponse)
def cafe(request: Request):
    return templates.TemplateResponse("cafe.html", {"request": request})


@app.get("/stay", response_class=HTMLResponse)
def stay(request: Request):
    return templates.TemplateResponse("stay.html", {"request": request})


@app.get("/travel", response_class=HTMLResponse)
def travel(request: Request):
    return templates.TemplateResponse("travel.html", {"request": request})


@app.get("/market", response_class=HTMLResponse)
def market(request: Request):
    return templates.TemplateResponse("market.html", {"request": request})
