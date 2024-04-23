Feature: Consulta de Produto
  Como um usuário
  Eu quero consultar informações sobre produtos e estabelecimentos
  Para tomar decisões informadas

  Scenario: Validar informações sobre os produtos e estabelecimentos
    Given que eu realize uma consulta ao endpoint de produtos e estabelecimentos
    Then o JSON retornado deve conter a chave "typeOfEstablishment"
    And deve ser impresso aleatoriamente um tipo de estabelecimento