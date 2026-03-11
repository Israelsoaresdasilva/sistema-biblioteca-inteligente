from fastapi import APIRouter
from database import SessionLocal
from models.usuario import Usuario

router = APIRouter(prefix="/usuarios", tags=["usuarios"])

@router.post("/")
def criar_usuario(usuario: dict):

    db = SessionLocal()

    novo_usuario = Usuario(**usuario)

    db.add(novo_usuario)
    db.commit()

    return {"mensagem": "Usuário criado"}