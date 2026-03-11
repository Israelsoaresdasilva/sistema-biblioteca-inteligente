def recomendar_livros(classificacao_usuario, livros):

    recomendados = []

    for livro in livros:
        if livro.classificacao == classificacao_usuario:
            recomendados.append(livro.nome)

    return recomendados