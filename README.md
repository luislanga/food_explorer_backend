# Food Explorer - Desafio Final (Rocketseat Explorer) (back-end)

Sobre o projeto: **Food Explorer** foi o desafio final proposto no curso Explorer da Rocketseat. Trata-se de uma aplicação web full stack com React no front-end, consumindo uma api que usa Node.js, Express e SQLite e tem como tema um restaurante virtual no qual um administrador pode cadastrar e editar pratos e alterar o status de pedidos feitos por um usuário comum.

Link do deploy: https://foodexp.netlify.app/


# Login e sign up

Na tela inicial o usuário cadastrado pode fazer login ou clicar em "Criar uma conta" para ser redirecionado à tela de cadastro.

# Personas

A aplicação apresenta 2 personas: usuário comum e administrador. Para cadastrar um usuário administrador é necessário fazer um POST request direto em um endpoint da api. Para cadastrar um usuário comum, basta não estar logado, navegar até /register e preencher o cadastro.

Credenciais para usuário administrador:
Email: admin@admin.com
Senha: admin

## Usuário Administrador

O usuário administrador tem permissão para criar e alterar pratos e alterar o status de um pedido feito por um usuário comum.


## Usuário comum

O usuário comum pode adicionar itens ao carrinho, adicionar itens aos favoritos, fazer pedidos e acompanhar o status de seu(s) pedido(s).
