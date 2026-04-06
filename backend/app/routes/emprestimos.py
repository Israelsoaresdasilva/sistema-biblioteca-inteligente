from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from datetime import date
from app.database.database import get_db
from app.models.emprestimo import Emprestimo

router = APIRouter(prefix="/emprestimos", tags=["Empréstimos"])

@router.get("/")
def listar_emprestimos(db: Session = Depends(get_db)):
    return db.query(Emprestimo).all()

@router.post("/")
def criar_emprestimo(matricula_usuario: int, id_livro: int,
                     data_emprestimo: date, data_devolucao_prevista: date,
                     db: Session = Depends(get_db)):
    emprestimo = Emprestimo(
        matricula_usuario=matricula_usuario,
        id_livro=id_livro,
        data_emprestimo=data_emprestimo,
        data_devolucao_prevista=data_devolucao_prevista
    )
    db.add(emprestimo)
    db.commit()
    db.refresh(emprestimo)
    return emprestimo
