from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

# --------------------------
# PATH ที่ถูกต้องสำหรับ Vercel
# --------------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")

print("STATIC_DIR:", STATIC_DIR)
print("TEMPLATE_DIR:", TEMPLATE_DIR)

app = FastAPI()

# Validate directories
if not os.path.isdir(STATIC_DIR):
    raise RuntimeError("Static folder not found: " + STATIC_DIR)

if not os.path.isdir(TEMPLATE_DIR):
    raise RuntimeError("Templates folder not found: " + TEMPLATE_DIR)

# Mount
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")
templates = Jinja2Templates(directory=TEMPLATE_DIR)

# --------------------------
# ROUTES
# --------------------------
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


# Local run only
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
