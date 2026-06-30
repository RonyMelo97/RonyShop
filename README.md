# RonyShop 🛒

E-commerce desenvolvido em React consumindo a API pública [DummyJSON](https://dummyjson.com), criado para demonstrar habilidades em desenvolvimento Front-End moderno.

## 🚀 Demo

> Em breve

## ✨ Funcionalidades

- Listagem de produtos com filtro por categoria
- Página de produto com galeria de imagens interativa
- Abas de Descrição e Avaliações por produto
- Carrinho de compras com controle de quantidade e cálculo de desconto
- Produtos relacionados por categoria
- Página de contato com informações do desenvolvedor
- Layout totalmente responsivo (mobile first)

## 🛠 Tecnologias

- **React 19**
- **React Router v6** — navegação e rotas aninhadas
- **Context API** — gerenciamento de estado global (carrinho)
- **CSS Modules + SCSS** — estilização por componente
- **Fetch API** — consumo de dados da DummyJSON
- **Vite** — bundler e servidor de desenvolvimento

## 📦 Como rodar localmente

```bash
# Clone o repositório
git clone https://github.com/RonyMelo97/RonyShop.git

# Entre na pasta
cd RonyShop

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:5173`

## 📁 Estrutura do projeto

```
src/
├── ronyShop/
│   ├── Components/
│   │   ├── Carrinho/        # Ícone do carrinho no header
│   │   ├── Modal/           # Modal do carrinho
│   │   ├── Catedorias/      # Filtro de categorias
│   │   ├── ProdutoAvaliacoes/
│   │   ├── ProdutoDescricao/
│   │   └── ProdutoRelacionado/
│   ├── Header/
│   ├── Footer/
│   ├── Produto/             # Página de produto individual
│   ├── Produtos/            # Listagem de produtos
│   ├── Contato/
│   └── GlobalContext.jsx    # Estado global (carrinho)
├── App.jsx
├── main.jsx
└── index.scss
```

## 👨‍💻 Autor

**Rony Melo**

[![GitHub](https://img.shields.io/badge/GitHub-RonyMelo97-181717?style=flat&logo=github)](https://github.com/RonyMelo97)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Rony%20Melo-0077B5?style=flat&logo=linkedin)](https://www.linkedin.com/in/rony-melo-14856bba/)
