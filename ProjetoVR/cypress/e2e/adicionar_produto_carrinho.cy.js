// Prevenindo que o Cypress falhe o teste em caso de exceções não capturadas
Cypress.on('uncaught:exception', (err, runnable) => {
  // retornando false aqui previne o Cypress de falhar o teste
  return false;
});

// Descrição do teste
describe('Teste de Compra de Cartões VR', () => {
  it('deve adicionar um cartão do tipo Auto ao carrinho com sucesso', () => {
    // Acessa a home do portal VR
    cy.visit('https://www.vr.com.br');

    // Modifica o botão para não abrir nova aba e captura o href
    cy.get('#buttonCompreOnline', { timeout: 10000 })
      .should('be.visible')
      .invoke('removeAttr', 'target')  // Remove o atributo target, se existir
      .invoke('attr', 'href')          // Captura o href para uso posterior
      .then((href) => {
        // Navega diretamente para o href capturado
        cy.visit('https://loja.vr.com.br');
      });

    // Aguarda o carregamento da página da loja e continua
    cy.url().should('include', 'loja.vr.com.br'); // Verifica se está na URL correta
    cy.contains('strong', 'Quero oferecer').click(); // Fecha o Banner
    
    // Clicando em "Cartões VR"
    cy.contains('Cartões VR', { timeout: 10000 }).click();  // Click em Cartões VR

    // Seleciona o produto "Auto"
    cy.contains('Auto').click(); 
  
    // Preenchendo a quantidade aleatória de cartões 
    cy.get('#produto-auto-quantidade', { timeout: 10000 }).should('be.visible').then(() => {
      const quantidadeAleatoria = Math.floor(Math.random() * 5) + 1;
      cy.get('#produto-auto-quantidade').type(quantidadeAleatoria.toString());
    });

    // Preenchendo o valor de crédito aleatório
    cy.get('#produto-auto-valor', { timeout: 10000 }).should('be.visible').then(() => {
      // Gerando um valor aleatório entre 100 e 1000 centavos (1 a 10 reais)
      const valorAleatorio = Cypress._.random(100, 1000);
    
      // Convertendo o valor para reais
      const valorEmReais = (valorAleatorio / 100).toFixed(2);
    
      // Inserindo o valor no campo de entrada
      cy.get('#produto-auto-valor').clear().type(valorEmReais);
    });
    
    // Clica em "Adicionar ao carrinho"
    cy.get('#btn-adicionar-carrinho-auto', { timeout: 10000 }).click();

    // Clicando no ícone do carrinho de compras
    cy.get('i.fa-light.fa-cart-shopping').click();
    
    // Validar a quantidade de itens no carrinho diferente de 0
    cy.get('span', { timeout: 10000 }).should('not.have.text', '0');
    
  });
});