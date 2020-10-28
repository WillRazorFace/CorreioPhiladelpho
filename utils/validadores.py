from re import compile, search

def checar_caracteres_especiais_e_numeros(string: str) -> bool:
    # Checa se uma string possui caracteres especiais ou números
    checagem = compile('[^a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ]+')

    if checagem.search(string):
        return True
    else:
        return False
