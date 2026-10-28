import { test, expect } from '@playwright/test';
import { LoginPage } from './pages/loginpage';
test("login com credencias validas",async ({page})=>{
await page.goto("https://www.saucedemo.com/")

})

test.describe('Testes de login - SauceDemo', () => {
  test('1. Deve realizar login com sucesso', async ({ page }) => {
  const login = new LoginPage(page);

  await page.goto('https://www.saucedemo.com/');

  await login.fazerLogin('standard_user', 'secret_sauce');

  await expect(page).toHaveURL(/inventory.html/);

  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();
});

  test('2. Deve apresentar erro com senha incorreta', async ({ page }) => {
  // Cria um objeto da classe LoginPage.
  const login = new LoginPage(page);

  // Acessa a página de login do SauceDemo.
  await page.goto('https://www.saucedemo.com/');

  // Tenta fazer login com uma senha incorreta.
  await login.fazerLogin('standard_user', 'senha_incorreta');

  // Verifica se a mensagem de erro aparece na página.
  await expect(
    page.getByText(
      'Username and password do not match any user in this service'
    )
  ).toBeVisible();
});


  test('3. Deve exibir os produtos após o login', async ({ page }) => {
  // Cria um objeto da classe LoginPage.
  const login = new LoginPage(page);

  // Acessa a página de login.
  await page.goto('https://www.saucedemo.com/');

  // Realiza o login com credenciais válidas.
  await login.fazerLogin('standard_user', 'secret_sauce');

  // Verifica se o título Products está visível.
  await expect(
    page.getByText('Products', { exact: true })
  ).toBeVisible();

   await expect(
    page.locator('.inventory_item')
  ).toHaveCount(6);

  }); // Fecha o teste 3
});   // Fecha o test.describe