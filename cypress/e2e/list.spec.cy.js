describe('Тест страницы List', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/list');
  });

  it("Если в инпуте пусто, то кнопка добавления, кнопка добавления по индексу и удаления по индексу недоступны", () => {
    cy.get("input").should("be.empty");
    cy.contains('Добавить по индексу').should("be.disabled");
    cy.contains('Удалить по индексу').should("be.disabled");
    cy.contains('Добавить в head').should("be.disabled");
    cy.contains('Добавить в tail').should("be.disabled");
  });

  it("Добавление элемента в head", () => {
    cy.get("input").first().type("10");
    cy.contains("Добавить в head").click();
    cy.get("[class*=circle_modified]").contains("10");
    cy.wait(500);
    cy.get('[data-cy="circleWrapper"]')
      .each((el, index) => {
        index === 0 && expect(el).contain('10');
        index === 0 && expect(el).contain("head");
        index === 5 && expect(el).contain("tail");
      });
    cy.get("[class*=circle_default]").contains("10");
  });

  it("Добавление элемента в tail", () => {
    cy.get("input").first().type("10");
    cy.contains("button", "Добавить в tail").click();
    cy.get("[class*=circle_modified]").contains("10");
    cy.wait(1000);
    cy.get('[data-cy="circleWrapper"]')
      .each((el, index) => {
        index === 6 && expect(el).contain("10");
        index === 6 && expect(el).contain("tail");
      });
    cy.get("[class*=circle_default]").contains("10");
  });

  it('Добавление элемента по индексу', function () {
    const inputValue = 7;
    const inputIndex = 1;
    cy.get('input[name=inputValue]').first().as('value');
    cy.get('input[name=inputIndex]').last().as('index');
    cy.get('@value').should('be.empty').type(inputValue);
    cy.get('@index').should('be.empty').type(inputIndex);
    cy.contains("button", 'Добавить по индексу').click({ force: true });
    for (let i = 0; i <= inputIndex; i++) {
      cy.get('[class*=circle_small__]')
        .first()
        .contains(inputValue)
      cy.wait(500);
    };
    cy.get('[class^=circle_circle__]')
      .eq(inputIndex)
      .contains(inputValue);
    cy.get('[class^=circle_circle__]')
      .eq(inputIndex)
      .contains(inputValue);
  });

  it('Удаление элемента из head', function () {
    cy.contains('Удалить из head').first().as('delHead');
    cy.get('@delHead').click();
    cy.get('[class^=circle_circle__]').its('length').then((size) => {
      cy.get('[class*=circle_small__]')
        .first()
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 2);
    });
  });

  it('Удаление элемента из tail', function () {
    cy.contains('Удалить из tail').first().as('delTail');
    cy.get('@delTail').click();
    cy.get('[class^=circle_circle__]').its('length').then((size) => {
      cy.get('[class*=circle_small__]')
        .first()
      cy.get('[class^=circle_circle__]').its('length').should('eq', size - 2);
    });
  });

  it('Удаление элемента по индексу', function () {
    const inputIndex = 2;
    cy.get('input[name=inputIndex]').last().as('index');
    cy.get('@index').should('be.empty').type(inputIndex);
    cy.wait(500);
    cy.contains('Удалить по индексу').click({ force: true });
    for (let i = 0; i < inputIndex; i++) {
      cy.get('[class^=circle_circle__]')
        .eq(i)
      if (i < inputIndex - 1) {
        cy.wait(500);
      }
    };
    cy.get('[class^=circle_circle__]').its('length').then((size) => {
      cy.get('[class*=circle_small__]')
        .first()
        .should("have.css", "border-color", "rgb(210, 82, 225)");
      cy.wait(1000)
      cy.get('[class^=circle_circle__]').should("have.length", size - 1);
    });
  });
})