const arrayValues = ['1', '2', '3']
describe('Тест страницы "Очередь"', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/queue');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit('http://localhost:3000/queue');
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Добавить').should('be.disabled');
  });


  it('Добавление элементов в очередь,курсоры head и tail отрисовываются корректно', () => {
    cy.visit('http://localhost:3000/queue');
    cy.get('input').type('a')
    cy.contains('button', 'Добавить').click();
    cy.get('[class*=circle_content]').first().as('firstElement');
    cy.get('@firstElement').contains('a');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').contains('tail');
    cy.get('@firstElement').children('[class*=circle_index]').contains('0');
    cy.wait(500);
    cy.get('@firstElement').children('[class*=circle_default]');
    cy.get('input').type('b')
    cy.contains('button', 'Добавить').click();
    cy.get('[class*=circle_content]').eq(1).as('secondElement');
    cy.get('@firstElement').contains('head');
    cy.get('@firstElement').not('tail');
    cy.get('@secondElement').contains('b');
    cy.get('@secondElement').contains('tail');
    cy.get('@secondElement').children('[class*=circle_index]').contains('1');
    cy.wait(500);
    cy.get('@secondElement').children('[class*=circle_default]');
  });

  it("Удаления элемента из очереди", () => {
    cy.get("input").type('0');
    cy.contains('Добавить').click();
    cy.get("input").type('1');
    cy.contains('Добавить').click();
    cy.get('[data-cy="circleWrapper"]').as('circleComponent');
    cy.contains('Удалить').click();
    cy.get("@circleComponent").each((el, ind) => {
      ind === 0 && expect(el).to.contain('0');
      if (ind === 1) {
        expect(el).to.contain('1');
        expect(el).to.contain("tail");
      }
    });
    cy.get("@circleComponent").eq(1).should("contain", "head");
  })

  it("Проверка поведения кнопки «Очистить»", () => {
    arrayValues.forEach(((val) => {
      cy.get("input").type(val);
      cy.contains('Добавить').click();
    }))
    cy.contains('Очистить').click();
    cy.get('[data-cy="circleWrapper"]').should("contain", '')
  }
  )
});