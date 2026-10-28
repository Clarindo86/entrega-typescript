// Importa os tipos Page e Locator do Playwright.
import { type Page, type Locator } from '@playwright/test';

// Declara e exporta a classe LoginPage.
// Ela representa a página de login do SauceDemo.
export class LoginPage {

  // Declara um locator para localizar o campo de usuário.
  // private: só pode ser acessado diretamente dentro da classe.
  // readonly: a referência não poderá ser reatribuída após inicializada.
  private readonly usuario: Locator;

  // Declara um locator para localizar o campo de senha.
  private readonly senha: Locator;

  // Declara um locator para localizar o botão de login.
  private readonly botaoLogin: Locator;

  // Construtor: é executado quando criamos um objeto LoginPage.
  // Recebe a página controlada pelo Playwright.
  // private readonly page: Page também declara e armazena essa propriedade.
  constructor(private readonly page: Page) {

    // Localiza o campo de texto identificado como Username.
    // Guarda o locator na propriedade usuario.
    this.usuario = page.getByRole('textbox', {
      name: 'Username',
    });

    // Localiza o campo de senha identificado como Password.
    this.senha = page.getByRole('textbox', {
      name: 'Password',
    });

    // Localiza o botão identificado como Login.
    this.botaoLogin = page.getByRole('button', {
      name: 'Login',
    });

  // Fecha o construtor.
  }

  // Declara uma ação assíncrona chamada fazerLogin.
  // Recebe o usuário e a senha como textos (string).
  async fazerLogin(usuario: string, senha: string) {

    // Preenche o campo de usuário com o valor recebido.
    // this.usuario referencia o locator criado no construtor.
    await this.usuario.fill(usuario);

    // Preenche o campo de senha com o valor recebido.
    await this.senha.fill(senha);

    // Clica no botão de login.
    await this.botaoLogin.click();

  // Fecha o método fazerLogin.
  }

// Fecha a classe LoginPage.
}