from fastapi import APIRouter
from database import SessionLocal
from models.livro import Livro

router = APIRouter(prefix="/livros", tags=["livros"])

@router.post("/")
def criar_livro(livro: dict):

    db = SessionLocal()

    novo_livro = Livro(**livro)

    db.add(novo_livro)
    db.commit()

    return {"mensagem": "Livro cadastrado"}