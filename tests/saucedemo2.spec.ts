
import { test, expect, Page } from '@playwright/test';

// Função reutilizável para fazer login
async function fazerLogin(page: Page): Promise<void> {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');
  await page.locator('[data-test="login-button"]').click();

  // Assert 1: verifica se a URL contém inventory.html
  await expect(page).toHaveURL(/inventory.html/);
}

test.describe('Testes E2E - SauceDemo com diferentes asserts', () => {

  test('01 - Login com sucesso', async ({ page }) => {
    await fazerLogin(page);

    // Assert 2: verifica se o título está visível
    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

    // Assert 3: verifica se o botão de menu está habilitado
    await expect(
      page.locator('[data-test="open-menu"]')
    ).toBeEnabled();
  });

  test('02 - Adicionar produto ao carrinho', async ({ page }) => {
    await fazerLogin(page);

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    // Assert 4: verifica o texto do contador
    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

    await page.locator('[data-test="shopping-cart-link"]').click();

    // Assert 5: verifica se o produto está no carrinho
    await expect(
      page.getByText('Sauce Labs Backpack', { exact: true })
    ).toBeVisible();

    // Assert 6: verifica se existe exatamente um item no carrinho
    await expect(
      page.locator('.cart_item')
    ).toHaveCount(1);
  });

  test('03 - Validar checkout e finalizar pedido', async ({ page }) => {
    await fazerLogin(page);

    await page.locator(
      '[data-test="add-to-cart-sauce-labs-backpack"]'
    ).click();

    await page.locator('[data-test="shopping-cart-link"]').click();
    await page.locator('[data-test="checkout"]').click();

    await page.locator('[data-test="firstName"]').fill('Alex');
    await page.locator('[data-test="lastName"]').fill('Clarindo');
    await page.locator('[data-test="postalCode"]').fill('50000-000');

    await page.locator('[data-test="continue"]').click();

    // Assert 7: verifica se avançou para a segunda etapa
    await expect(page).toHaveURL(/checkout-step-two.html/);

    // Assert 8: verifica se o preço total está visível
    await expect(
      page.locator('[data-test="total-label"]')
    ).toBeVisible();

    await page.locator('[data-test="finish"]').click();

    // Assert 9: verifica a mensagem de confirmação
    await expect(
      page.getByText('Thank you for your order!', { exact: true })
    ).toBeVisible();

    // Assert 10: verifica a URL da confirmação
    await expect(page).toHaveURL(/checkout-complete.html/);
  });

  test('04 - Validar mensagem de erro no login', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');

    await page.locator('[data-test="username"]').fill('usuario_invalido');
    await page.locator('[data-test="password"]').fill('senha_invalida');
    await page.locator('[data-test="login-button"]').click();

    // Assert 11: verifica se a mensagem de erro aparece
    await expect(
      page.locator('[data-test="error"]')
    ).toBeVisible();

    // Assert 12: verifica o conteúdo da mensagem
    await expect(
      page.locator('[data-test="error"]')
    ).toContainText('Username and password do not match');

    // Assert 13: verifica se o usuário continua na página de login
    await expect(page).toHaveURL('https://www.saucedemo.com/');
  });

  test('05 - Gerar evidência visual', async ({ page }) => {
    await fazerLogin(page);

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

    await page.screenshot({
      path: 'test-results/evidencia-saucedemo.png',
      fullPage: true
    });
  });

});