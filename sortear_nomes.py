import argparse
import csv
import random
from pathlib import Path


def carregar_categorias(caminho_csv: Path) -> dict[str, list[str]]:
    with caminho_csv.open("r", encoding="utf-8-sig", newline="") as arquivo:
        leitor = csv.DictReader(arquivo)
        if not leitor.fieldnames or len(leitor.fieldnames) != 3:
            raise ValueError("O arquivo CSV deve ter exatamente 3 colunas de categorias.")

        categorias = {nome_categoria: [] for nome_categoria in leitor.fieldnames}

        for linha in leitor:
            for categoria in leitor.fieldnames:
                nome = (linha.get(categoria) or "").strip()
                if nome:
                    categorias[categoria].append(nome)

    vazias = [categoria for categoria, nomes in categorias.items() if not nomes]
    if vazias:
        raise ValueError(
            f"As categorias a seguir estao vazias: {', '.join(vazias)}."
        )

    return categorias


def criar_fila_embaralhada(nomes: list[str], gerador: random.Random) -> list[str]:
    fila = nomes[:]
    gerador.shuffle(fila)
    return fila


def gerar_sorteios(
    categorias: dict[str, list[str]],
    quantidade_rodadas: int | None,
    semente: int | None,
) -> list[dict[str, str]]:
    gerador = random.Random(semente)
    filas = {
        categoria: criar_fila_embaralhada(nomes, gerador)
        for categoria, nomes in categorias.items()
    }
    indices = {categoria: 0 for categoria in categorias}

    if quantidade_rodadas is None:
        quantidade_rodadas = max(len(nomes) for nomes in categorias.values())

    sorteios = []
    for rodada in range(1, quantidade_rodadas + 1):
        resultado_rodada = {"Rodada": str(rodada)}

        for categoria, nomes in categorias.items():
            if indices[categoria] >= len(filas[categoria]):
                filas[categoria] = criar_fila_embaralhada(nomes, gerador)
                indices[categoria] = 0

            resultado_rodada[categoria] = filas[categoria][indices[categoria]]
            indices[categoria] += 1

        sorteios.append(resultado_rodada)

    return sorteios


def imprimir_resultado(sorteios: list[dict[str, str]], categorias: list[str]) -> None:
    cabecalhos = ["Rodada", *categorias]
    larguras = {
        coluna: max(len(coluna), *(len(linha[coluna]) for linha in sorteios))
        for coluna in cabecalhos
    }

    linha_cabecalho = " | ".join(
        coluna.ljust(larguras[coluna]) for coluna in cabecalhos
    )
    separador = "-+-".join("-" * larguras[coluna] for coluna in cabecalhos)

    print(linha_cabecalho)
    print(separador)

    for linha in sorteios:
        print(" | ".join(linha[coluna].ljust(larguras[coluna]) for coluna in cabecalhos))


def salvar_csv_saida(
    sorteios: list[dict[str, str]], categorias: list[str], caminho_saida: Path
) -> None:
    with caminho_saida.open("w", encoding="utf-8", newline="") as arquivo:
        escritor = csv.DictWriter(arquivo, fieldnames=["Rodada", *categorias])
        escritor.writeheader()
        escritor.writerows(sorteios)


def main() -> None:
    parser = argparse.ArgumentParser(
        description=(
            "Sorteia nomes de uma tabela com 3 categorias, mantendo cada nome "
            "na sua propria categoria e garantindo que todos aparecam ao menos "
            "uma vez antes de repetir."
        )
    )
    parser.add_argument(
        "arquivo",
        nargs="?",
        default="nomes_exemplo.csv",
        help="Caminho do CSV com as 3 categorias. Padrao: nomes_exemplo.csv",
    )
    parser.add_argument(
        "-r",
        "--rodadas",
        type=int,
        default=None,
        help=(
            "Quantidade de rodadas. Se nao informar, usa o minimo necessario "
            "para que todas as pessoas aparecam ao menos uma vez."
        ),
    )
    parser.add_argument(
        "-s",
        "--seed",
        type=int,
        default=None,
        help="Semente opcional para repetir o mesmo sorteio.",
    )
    parser.add_argument(
        "-o",
        "--saida",
        default=None,
        help="Arquivo CSV opcional para salvar o resultado do sorteio.",
    )

    args = parser.parse_args()
    caminho_entrada = Path(args.arquivo)

    categorias = carregar_categorias(caminho_entrada)
    sorteios = gerar_sorteios(categorias, args.rodadas, args.seed)
    imprimir_resultado(sorteios, list(categorias.keys()))

    if args.saida:
        salvar_csv_saida(sorteios, list(categorias.keys()), Path(args.saida))
        print(f"\nResultado salvo em: {args.saida}")


if __name__ == "__main__":
    main()
