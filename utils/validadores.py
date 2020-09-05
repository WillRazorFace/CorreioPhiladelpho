from re import compile, search

def checar_caracteres_especiais(string):
    checagem = compile('@_!#$%^&*()<>?/\|}{~:')

    if checagem.search(string):
        return True
    else:
        return False
