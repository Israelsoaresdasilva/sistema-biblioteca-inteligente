from sqlalchemy import Column, Integer, Date, Float, ForeignKey
from app.database.database import Base

class Emprestimo(Base):
    __tablename__ = "emprestimos"
    id_emprestimo = Column(Integer, primary_key=True, index=True)
    matricula_usuario = Column(Integer, ForeignKey("usuarios.matricula"))
    id_livro = Column(Integer, ForeignKey("livros.id_livro"))
    data_emprestimo = Column(Date)
    data_devolucao_prevista = Column(Date)
    data_devolucao_real = Column(Date)
    multa = Column(Float)
