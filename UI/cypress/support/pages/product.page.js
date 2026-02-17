class ProductPage {

  selectSize(size) {
    cy.get('select[name="attribute_size"]')
      .select(size, { force: true });
  }

  selectColor(color) {
    cy.get('select[name="attribute_color"]')
      .select(color, { force: true });
  }

  setQuantity(quantity) {
    cy.get('input.qty')
      .clear()
      .type(quantity);
  }

  addToCart() {
    cy.get('button.single_add_to_cart_button', { timeout: 10000 })
      .should('not.have.class', 'disabled')
      .click();
  }
}

export const productPage = new ProductPage();