from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates

app = FastAPI()

# Static files
app.mount("/static", StaticFiles(directory="static"), name="static")

# Templates
templates = Jinja2Templates(directory="templates")


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
