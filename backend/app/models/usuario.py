from sqlalchemy import Column, Integer, String
from app.database.database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    matricula = Column(Integer, primary_key=True, index=True)
    cpf = Column(String)
    nome = Column(String)
    endereco = Column(String)
    email = Column(String)
    telefone = Column(String)
