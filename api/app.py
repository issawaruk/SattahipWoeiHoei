from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import os

app = FastAPI()

# --------------------------
# PATH ที่แก้ไขแล้ว (ถอยหลัง 1 ชั้นจาก api ไป root)
# --------------------------
# หาตำแหน่งของไฟล์นี้ (จะได้ .../project/api)
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))

# ถอยหลัง 1 ขั้นเพื่อไปที่ Root (จะได้ .../project)
BASE_DIR = os.path.dirname(CURRENT_DIR)

STATIC_DIR = os.path.join(BASE_DIR, "static")
TEMPLATE_DIR = os.path.join(BASE_DIR, "templates")

# Debug Path (ดูใน Vercel Logs เพื่อความชัวร์)
print(f"CURRENT_DIR: {CURRENT_DIR}")
print(f"BASE_DIR (Root): {BASE_DIR}")
print(f"Looking for Static at: {STATIC_DIR}")

# --------------------------
# VALIDATION
# --------------------------
if not os.path.isdir(STATIC_DIR):
    # ปริ้นท์ Directory Listing เพื่อดูว่า Vercel copy ไฟล์มาครบไหม (ช่วย Debug)
    print(f"Contents of {BASE_DIR}: {os.listdir(BASE_DIR) if os.path.exists(BASE_DIR) else 'Base dir not found'}")
    raise RuntimeError(f"Static folder not found at: {STATIC_DIR}")

if not os.path.isdir(TEMPLATE_DIR):
    raise RuntimeError(f"Templates folder not found at: {TEMPLATE_DIR}")

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