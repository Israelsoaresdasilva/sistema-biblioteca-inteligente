from fastapi import APIRouter
from database import SessionLocal
from models.emprestimo import Emprestimo
from datetime import date

router = APIRouter(prefix="/emprestimos", tags=["emprestimos"])

@router.post("/")
def registrar_emprestimo(dados: dict):

    db = SessionLocal()

    emprestimo = Emprestimo(**dados)

    db.add(emprestimo)
    db.commit()

    return {"mensagem": "Empréstimo registrado"}