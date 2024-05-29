describe('Тест роутинга в приложении', function () {
  before(function () {
    cy.visit('http://localhost:3000');
  });

  it('Открывается стартовая страница', () => {
    cy.contains('МБОУ АЛГОСОШ');
  });

  it('Открывается страница String', function () {
    cy.visit('http://localhost:3000');
    cy.get('a[href="/recursion"]').click()
    cy.contains('Строка');

  });

  it('Открывается страница Fibonacci', function () {
    cy.visit('http://localhost:3000');
    cy.get('a[href="/fibonacci"]').click()
    cy.contains('Последовательность Фибоначчи');

  })
  it('Открывается страница Sorting', function () {
    cy.visit('http://localhost:3000');
    cy.get('a[href="/sorting"]').click()
    cy.contains('Сортировка массива');
  })

  it('Открывается страница Stack', function () {
    cy.visit('http://localhost:3000');
    cy.get('a[href="/stack"]').click()
    cy.contains('Стек');
  })

  it('Открывается страница Queue', function () {
    cy.visit('http://localhost:3000');
    cy.get('a[href="/queue"]').click()
    cy.contains('Очередь');
  })

  it('Открывается страница List', function () {
    cy.visit('http://localhost:3000');
    cy.get('a[href="/list"]').click()
    cy.contains('Связный список');
  })
}); 