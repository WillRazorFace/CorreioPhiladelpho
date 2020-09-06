from PIL import Image
from os.path import join
from django.conf import settings

def redimensionar(imagem: str, nova_largura: float) -> None:
    # Redimensiona automaticamente a imagem a partir da largura
    caminho_imagem = join(settings.MEDIA_ROOT, imagem)

    with Image.open(caminho_imagem) as imagem:
        largura, altura = imagem.size
        nova_altura = (nova_largura * altura) / largura

        if largura <= nova_largura:
            imagem.close()
            return

        nova_imagem = imagem.resize([int(nova_largura), int(nova_altura)], Image.ANTIALIAS)
        nova_imagem.save(caminho_imagem, optimize=True, quality=60)
