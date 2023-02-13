# API de Vendas de Artigos Esportivos
Este repositório contém o código fonte de uma API construída com Node.js, Sequelize e na arquitetura model/controller/service, com validação JWT. A API foi criada para gerenciar o cadastro de usuários e produtos em um site de vendas de artigos esportivos.

## Instalação
Para instalar e rodar esta API em sua máquina local, siga os seguintes passos:

### Clone este repositório na sua máquina
git clone https://github.com/benhuralbertassi12/api-vendas-artigos-esportivos.git
Acesse a pasta do repositório clonado

cd api-vendas-artigos-esportivos
Instale as dependências
npm install
Configure o arquivo .env com as informações de conexão com o banco de dados e com o segredo JWT.

Rode as migrations

* npx sequelize db:migrate
* Inicie a API
* npm start

## Rotas da API
> A seguir estão descritas as rotas disponíveis nesta API:

* POST /users: cria um novo usuário.

* GET /users: retorna todos os usuários cadastrados.

* GET /users/:id: retorna o usuário com o id especificado.

* PUT /users/:id: atualiza o usuário com o id especificado.

* DELETE /users/:id: remove o usuário com o id especificado.

* POST /login: autentica um usuário com base no email e senha fornecidos.

* POST /products: cria um novo produto.

* GET /products: retorna todos os produtos cadastrados.

* GET /products/:id: retorna o produto com o id especificado.

* PUT /products/:id: atualiza o produto com o id especificado.

* DELETE /products/:id: remove o produto com o id especificado.

## Tecnologias Utilizadas
* Node.js
* Sequelize
* JWT

## Contribuições
Este é um projeto Open Source e qualquer contribuição é bem-vinda. Para contribuir, basta seguir os seguintes passos:

* Faça um fork deste repositório.
* Crie uma branch com sua feature.
* Envie sua pull request.

## Licença
Este projeto está licenciado sob a licença MIT. Mais informações podem ser encontradas no arquivo LICENSE.