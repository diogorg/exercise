# Exercicio de teste React e Laravel com Docker.

Exercicio simples com front e back. Possíbilitando importar uma planilha CSV para o BD com endereços e após isso permitir ver a rota entre dois endereços.

# START BACK:

```shell
- cp .env.example .env
- sudo chmod 777 storage/logs/ -R 
- sudo chmod 777 storage/framework -R 
- docker-compose build
- docker-compose up
- docker exec -it eleven-php_app_1 bash
- composer update
- php artisan key:generate
- php artisan migrate:refresh
- php artisan db:seed
```

# START FRONT:

```shell
- yarn install
- yarn start
```
