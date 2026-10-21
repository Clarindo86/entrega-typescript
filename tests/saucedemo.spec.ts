
import { test, expect,Page } from '@playwright/test';

 // Função reutilizável para fazer login
async function fazerLogin(page: Page): Promise<void> {
  await page.goto('https://www.saucedemo.com/');

  await page.locator('[data-test="username"]').fill('standard_user');
  await page.locator('[data-test="password"]').fill('secret_sauce');

  await page.locator('[data-test="login-button"]').click();

  await expect(page).toHaveURL(/inventory.html/);
}

// Grupo de testes do SauceDemo
test.describe('Testes E2E - SauceDemo', () => {

  test('01 - Login usando Fill, Click e Expect', async ({ page }) => {
    await fazerLogin(page);

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();
  });

  test('02 - Adicionar produto ao carrinho usando Click', async ({ page }) => {
    await fazerLogin(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    await expect(
      page.locator('[data-test="shopping-cart-badge"]')
    ).toHaveText('1');

    await page.locator('[data-test="shopping-cart-link"]').click();

    await expect(
      page.getByText('Sauce Labs Backpack')
    ).toBeVisible();
  });

  test('03 - Preencher e enviar o checkout', async ({ page }) => {
    await fazerLogin(page);

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    await page.locator('[data-test="checkout"]').click();

    // Fill: preencher os dados do comprador
    await page.locator('[data-test="firstName"]').fill('Alex');
    await page.locator('[data-test="lastName"]').fill('Clarindo');
    await page.locator('[data-test="postalCode"]').fill('50000-000');

    // Submit: enviar o formulário
    await page.locator('[data-test="continue"]').click();

    await expect(page).toHaveURL(/checkout-step-two.html/);
    await expect(
      page.getByText('Sauce Labs Backpack')
    ).toBeVisible();

    await page.locator('[data-test="finish"]').click();

    await expect(
      page.getByText('Thank you for your order!')
    ).toBeVisible();
  });

  test('04 - Download do relatório de evidências', async ({ page }) => {
    await fazerLogin(page);

    await expect(
      page.getByText('Products', { exact: true })
    ).toBeVisible();

    // Evidência visual da execução
    await page.screenshot({
      path: 'test-results/evidencia-saucedemo.png',
      fullPage: true
    });
  });

});