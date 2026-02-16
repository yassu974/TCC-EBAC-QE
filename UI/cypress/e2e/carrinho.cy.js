describe('US-0001 - Adicionar item ao carrinho', () => {

  beforeEach(() => {
    cy.visit('http://localhost/product/ingrid-running-jacket/');
  });

  afterEach(() => {  
    cy.visit('http://localhost/carrinho/');    
    cy.get('body').then(($body) => {
      if ($body.find('.remove').length > 0) {
        cy.get('.remove')
          .first()
          .click({ force: true });
        
        cy.contains('Seu carrinho está vazio.', { timeout: 10000 })
          .should('be.visible');
      }
    });
  });

it('Deve adicionar produto variável ao carrinho com sucesso', () => {
    cy.get('select[name="attribute_size"]')
      .select('XS', { force: true });

    cy.get('select[name="attribute_color"]')
      .select('Orange', { force: true });

    cy.get('button.single_add_to_cart_button')
      .should('not.have.class', 'disabled');

    cy.get('button.single_add_to_cart_button')
      .click();

    cy.get('.woocommerce-message', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'no seu carrinho');

    cy.get('.woocommerce-message')
      .find('a')
      .should('contain', 'Ver carrinho');
  });

it('CT-003 - Não deve permitir adicionar mais de 10 itens (Regra não implementada)', () => {
    cy.get('select[name="attribute_size"]')
        .select('XS', { force: true });

    cy.get('select[name="attribute_color"]')
        .select('Orange', { force: true });

    cy.get('input.qty')
        .should('be.visible')
        .invoke('val', 11)
        .trigger('change');

    cy.get('button.single_add_to_cart_button')
        .should('not.have.class', 'disabled')
        .click();

    cy.get('.woocommerce-message', { timeout: 10000 })
        .should('be.visible')
        .and('contain', 'no seu carrinho');

    cy.visit('http://localhost/carrinho/');

    cy.get('input.qty')
        .should('have.value', '11');
});

it('CT-006 - Não deve permitir ultrapassar R$990 (Regra não implementada)', () => {
    cy.get('select[name="attribute_size"]')
        .select('XS', { force: true });

    cy.get('select[name="attribute_color"]')
        .select('Orange', { force: true });

    cy.get('input.qty')
        .should('be.visible')
        .invoke('val', 12)
        .trigger('change');

    cy.get('button.single_add_to_cart_button')
    .should('not.have.class', 'disabled')
    .click();

    cy.get('.woocommerce-message', { timeout: 10000 })
    .should('be.visible');

    cy.visit('http://localhost/carrinho/');

    cy.get('.order-total .amount')
    .invoke('text')
    .then((totalText) => {

      const total = parseFloat(
        totalText
          .replace('R$', '')
          .replace('.', '')
          .replace(',', '.')
          .trim()
      );

      expect(total).to.be.greaterThan(990);
    });
});

});