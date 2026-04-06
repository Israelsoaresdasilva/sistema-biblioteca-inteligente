from sqlalchemy import Column, Integer, String, Boolean
from app.database.database import Base

class Livro(Base):
    __tablename__ = "livros"
    id_livro = Column(Integer, primary_key=True, index=True)
    nome = Column(String)
    ano = Column(Integer)
    edicao = Column(String)
    autores = Column(String)
    editora = Column(String)
    classificacao = Column(String)
    localizacao = Column(String)
    emprestavel = Column(Boolean)
