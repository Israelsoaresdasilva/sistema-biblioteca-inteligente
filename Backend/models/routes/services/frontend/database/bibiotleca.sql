CREATE DATABASE biblioteca;

USE biblioteca;

-- Tabela de usuários
CREATE TABLE usuarios (

    matricula INT PRIMARY KEY AUTO_INCREMENT,
    cpf VARCHAR(14) NOT NULL,
    nome VARCHAR(100) NOT NULL,
    endereco VARCHAR(200),
    email VARCHAR(100),
    telefone VARCHAR(20)

);

-- Tabela de livros
CREATE TABLE livros (

    id_livro INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(150) NOT NULL,
    ano INT,
    edicao VARCHAR(20),
    autores VARCHAR(150),
    editora VARCHAR(100),
    classificacao VARCHAR(50),
    localizacao VARCHAR(50),
    emprestavel BOOLEAN DEFAULT TRUE

);

-- Tabela de empréstimos
CREATE TABLE emprestimos (

    id_emprestimo INT PRIMARY KEY AUTO_INCREMENT,

    matricula_usuario INT,
    id_livro INT,

    data_emprestimo DATE,
    data_devolucao_prevista DATE,
    data_devolucao_real DATE,

    multa DECIMAL(10,2) DEFAULT 0,

    FOREIGN KEY (matricula_usuario)
    REFERENCES usuarios(matricula),

    FOREIGN KEY (id_livro)
    REFERENCES livros(id_livro)

);