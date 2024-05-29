describe('Тест страницы Stack', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000/stack');
  });

  it('Если в инпуте пусто, то кнопка добавления недоступна', () => {
    cy.visit('http://localhost:3000/stack');
    cy.get('input').should('have.value', '');
    cy.contains('button', 'Добавить').should('be.disabled');
  });

  it('Добавление элемента в стэк', function () {
    cy.get("[type='text']").as('input')
    cy.get("@input").type('5')
    cy.contains('Добавить').click()
    cy.get('[class^="circle_content"]').should('have.length', 1)
    cy.get('[class^="circle_content"]').then((element) => {
      cy.wrap(element).find('[class*="circle_head"]').should('have.text', 'top')
      cy.wrap(element).find('[class*="circle_index"]').should('have.text', '0')
      cy.wrap(element).find('[class*="circle_circle"]').contains('5')
      cy.wrap(element)
        .find('[class*="circle_circle"]')
        .invoke('attr', 'class')
        .then(classAttribute => {
          expect(classAttribute).to.contain('circle_changing');
        });
      cy.wait(500)
      cy.wrap(element)
        .find('[class*="circle_circle"]')
        .invoke('attr', 'class')
        .then(classAttribute => {
          expect(classAttribute).to.contain('circle_default');
        });
      cy.contains('Добавить').find('img').should('not.exist')
    })
    cy.get("input").type('1')
    cy.contains('Добавить').click()
    cy.get('[class^="circle_content"]').should('have.length', 2)
    cy.get('[class^="circle_content"]').then((element) => {
      cy.wrap(element[1]).find('[class*="circle_head"]').should('have.text', 'top')
      cy.wrap(element[1]).find('[class*="circle_index"]').should('have.text', '1')
      cy.wrap(element[0]).find('[class*="circle_index"]').should('have.text', '0')
      cy.wrap(element[0]).find('[class*="circle_circle"]').contains('5')
      cy.wrap(element[1]).find('[class*="circle_circle"]').contains('1')
      cy.wrap(element[1])
        .find('[class*="circle_circle"]')
        .invoke('attr', 'class')
        .then(classAttribute => {
          expect(classAttribute).to.contain('circle_changing');
        });
      cy.wait(500)
      cy.wrap(element[1])
        .find('[class*="circle_circle"]')
        .invoke('attr', 'class')
        .then(classAttribute => {
          expect(classAttribute).to.contain('circle_default');
        });
      cy.contains('Добавить').find('img').should('not.exist')
    })
  })


  it("Удаления элемента из стека", () => {
    const testString = "A";
    cy.visit('http://localhost:3000/stack');
    cy.get("input").type(testString);
    cy.contains('Добавить').click()
    cy.get('[class^="circle_content"]').contains(testString);
    cy.wait(500);
    cy.contains('Удалить')
      .click()
      .then(() => {
        cy.get('[class^="circle_content"]').each(($el, index, $list) => {
          cy.get($list).should("have.length", 1);
          cy.get($el).contains(testString);
          cy.wait(500);
          cy.get($list).should("have.length", 0);
        });
      });
  });


  it("Проверка поведения кнопки «Очистить»", () => {
    const testString = "S";
    const arrayString = ["S", "S"];
    cy.visit('http://localhost:3000/stack');
    cy.get("input").type(testString);
    cy.contains('Добавить').click()
    cy.get("input").type(testString);
    cy.contains('Добавить').click()
    cy.wait(500);
    cy.get('[class^="circle_content"]').each(($el, index, $list) => {
      cy.get($list).should("have.length", 2);
      cy.get($el).contains(arrayString[index]);
    });
    cy.contains('Очистить')
      .click()
      .then(() => {
        cy.get('[class^="circle_content"]').should("have.length", 0);
      });
  });

})