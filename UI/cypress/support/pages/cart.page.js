class CartPage {

  openCart() {
    cy.visit('/carrinho/');
  }

  getQuantity() {
    return cy.get('input.qty');
  }

  getTotal() {
    return cy.get('.order-total .amount');
  }

  removeFirstItemIfExists() {
    cy.get('body').then(($body) => {
      if ($body.find('.remove').length > 0) {
        cy.get('.remove')
          .first()
          .click({ force: true });
      }
    });
  }
}

export const cartPage = new CartPage();