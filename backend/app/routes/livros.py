from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.database import get_db
from app.models.livro import Livro

router = APIRouter(prefix="/livros", tags=["Livros"])

@router.get("/")
def listar_livros(db: Session = Depends(get_db)):
    return db.query(Livro).all()

@router.post("/")
def criar_livro(nome: str, ano: int, edicao: str, autores: str,
                editora: str, classificacao: str, localizacao: str,
                emprestavel: bool, db: Session = Depends(get_db)):
    livro = Livro(nome=nome, ano=ano, edicao=edicao, autores=autores,
                  editora=editora, classificacao=classificacao,
                  localizacao=localizacao, emprestavel=emprestavel)
    db.add(livro)
    db.commit()
    db.refresh(livro)
    return livro

@router.get("/{livro_id}")
def buscar_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(Livro).filter(Livro.id_livro == livro_id).first()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    return livro

@router.delete("/{livro_id}")
def deletar_livro(livro_id: int, db: Session = Depends(get_db)):
    livro = db.query(Livro).filter(Livro.id_livro == livro_id).first()
    if not livro:
        raise HTTPException(status_code=404, detail="Livro não encontrado")
    db.delete(livro)
    db.commit()
    return {"msg": "Livro deletado"}
