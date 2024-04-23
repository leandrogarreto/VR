// Função para remover texto após marcadores
function removerTextoAposMarcadores(string, marcadores) {
  
  // Implementação da função aqui
  const indiceMarcador = marcadores.reduce((indice, marcador) => {
    const posicao = string.indexOf(marcador);
    if (posicao !== -1 && (indice === -1 || posicao < indice)) {
      return posicao;
    }
    return indice;
  }, -1);

  if (indiceMarcador !== -1) {
    string = string.substring(0, indiceMarcador);
  }

  return string.trim();
}

// Casos de teste
describe('Teste de remoção de texto após marcadores', () => {
  it('Cenário 1: Remover texto após marcadores "#", "!"', () => {
    const string1 = "bananas, tomates # e ventiladores";
    const marcadores1 = ["#", "!"];
    const resultadoEsperado1 = "bananas, tomates";

    expect(removerTextoAposMarcadores(string1, marcadores1)).to.equal(resultadoEsperado1);
  });

  it('Cenário 2: Remover texto após marcadores "%", "!"', () => {
    const string2 = "o rato roeu a roupa $ do rei % de roma";
    const marcadores2 = ["%", "!"];
    const resultadoEsperado2 = "o rato roeu a roupa $ do rei";

    expect(removerTextoAposMarcadores(string2, marcadores2)).to.equal(resultadoEsperado2);
  });

  it('Cenário 3: Remover texto após marcadores "&", "*", "%", "!"', () => {
    const string3 = "the quick brown fox & jumped over * the lazy dog";
    const marcadores3 = ["&", "*", "%", "!"];
    const resultadoEsperado3 = "the quick brown fox";

    expect(removerTextoAposMarcadores(string3, marcadores3)).to.equal(resultadoEsperado3);
  });
});
