describe('Тест страницы "Последовательность Фибоначчи"', function () {
  before(function () {
    cy.visit('http://localhost:3000/fibonacci');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.get('input').clear();
    cy.get('button[type="submit"]').should('be.disabled');
    cy.get('input').type('5');
    cy.get('button[type="submit"]').should('be.enabled');
  });

  it('Числа генерируются корректно', () => {
    cy.visit('http://localhost:3000/fibonacci');
    const inputNumber = 5;
    cy.get('input').type(inputNumber);
    cy.get('button').contains('Рассчитать').click();

    cy.get('[class*=circle_content]').last().as('element');
    cy.get('@element').contains('1');
    cy.get('@element').children('[class*=circle_default]');
    cy.wait(500);

    cy.get('@element').contains('1');
    cy.get('@element').children('[class*=circle_default]');
    cy.wait(500);

    cy.get('@element').contains('2');
    cy.get('@element').children('[class*=circle_default]');
    cy.wait(500);

    cy.get('@element').contains('3');
    cy.get('@element').children('[class*=circle_default]');
    cy.wait(500);

    cy.get('@element').contains('5');
    cy.get('@element').children('[class*=circle_default]');
    cy.wait(500);
  });
});