from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.database import Base, engine
from app.models import livro, usuario, emprestimo
from app.routes import livros, usuarios, emprestimos

Base.metadata.create_all(bind=engine)

app = FastAPI(title="Biblioteca Inteligente 📚")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(livros.router)
app.include_router(usuarios.router)
app.include_router(emprestimos.router)

@app.get("/")
def home():
    return {"msg": "API Biblioteca rodando 🚀"}
