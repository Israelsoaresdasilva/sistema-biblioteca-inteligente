from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.usuario import Usuario

router = APIRouter(prefix="/usuarios", tags=["Usuários"])

@router.get("/")
def listar_usuarios(db: Session = Depends(get_db)):
    return db.query(Usuario).all()

@router.post("/")
def criar_usuario(cpf: str, nome: str, endereco: str,
                  email: str, telefone: str,
                  db: Session = Depends(get_db)):
    usuario = Usuario(cpf=cpf, nome=nome, endereco=endereco,
                      email=email, telefone=telefone)
    db.add(usuario)
    db.commit()
    db.refresh(usuario)
    return usuario

@router.get("/{matricula}")
def buscar_usuario(matricula: int, db: Session = Depends(get_db)):
    usuario = db.query(Usuario).filter(Usuario.matricula == matricula).first()
    if not usuario:
        raise HTTPException(status_code=404, detail="Usuário não encontrado")
    return usuario
