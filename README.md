# QUAKE LOG PARSER

- [Rotas](#rotas)

- [Install & Run](#install--run)
 
- [Instruções](#descrição-e-instruções-da-tarefa)
 
- [Heroku Deploy](https://quake-log-api.herokuapp.com/)

## Rotas 

 ```GET / ```

 Acessando / você apenas terá um texto com informações de como acessar as outras rotas
 
 ```GET /games ```
 
 Acessando /games você terá uma lista dos games tirados do log, inclusive o id de um game que pode ser passado para a rota seguinte

```
 [
  {
    "game_id": "2e1cc5d852d9f51ffd88c7cb6e17a39f133a4f4e",
    "game_data": {
      "total_kills": 31,
      "players": ["player2", "player1", ...],
      "kills": {
        "player2": 11,
        "player1": 18,
        ...
      }
    }
  }
 ]
```
 
 ```GET /games/:id```
 
 Acessando /games/:id você terá o rank de jogadores em uma partida específicada pelo id

```
[
  {
    "2e1cc5d852d9f51ffd88c7cb6e17a39f133a4f4e": {
      "firstPlace": 10,
      "secondPlace": 8,
      ...
    }
  }
]
```


## Install & Run
  Para instalar tudo necessário apenas execute no terminal ```npm install```
  
  Para iniciar o servidor apenas execute no terminal ```npm run dev``` __ou__ ```npm start```

## Descrição e Instruções da Tarefa

### Goal 1:
 Construa um parser para o arquivo de log games.log (em anexo junto ao teste).
 
 O arquivo games.log é gerado pelo servidor de quake 3 arena. Ele registra todas as informações dos jogos, quando um jogo começa, quando termina, quem matou quem, quem morreu pq caiu no vazio, quem morreu machucado, entre outros.
 
 O parser deve ser capaz de ler o arquivo, agrupar os dados de cada jogo, e em cada jogo deve coletar as informações de morte.
 
 __Exemplo:__

  ```21:42 Kill: 1022 2 22: <world> killed Isgalamido by MOD_TRIGGER_HURT```
  
  (O player "Isgalamido" morreu pois estava ferido e caiu de uma altura que o matou.)

  ```2:22 Kill: 3 2 10: Isgalamido killed Dono da Bola by MOD_RAILGUN```
  
  (O player "Isgalamido" matou o player Dono da Bola usando a arma Railgun.)

Para cada jogo o parser deve gerar algo como:

```
game_1: {
    total_kills: 45;
    players: ["Dono da bola", "Isgalamido", "Zeh"]
    kills: {
      "Dono da bola": 5,
      "Isgalamido": 18,
      "Zeh": 20
    }
  }
```

#### Observações:
    1. Quando o __<world>__ mata o player ele perde -1 kill.
    2. __<world>__ não é um player e não deve aparecer na lista de players e nem no dicionário de kills.
    3. __total_kills__ são os kills dos games, isso inclui mortes do __<world>__.

### Tarefa 2:
  Após construir o parser construa um script que imprima um relatório de cada jogo (simplesmente imprimindo o hash) e um ranking geral de kills por jogador.

### Tarefa 3:
  Construir uma API que busque o resultado do Game por ID.

REQUISITOS:
1.	O exercício __deverá ser feito em NodeJS.__
2.	Faça testes unitários, suite de testes bem organizados.
3.	Use git e tente fazer commits pequenos e bem descritos.
4.	Faça pelo menos um README explicando como fazer o setup, uma explicação da solução proposta, o mínimo de documentação para outro desenvolvedor entender seu código.
5.	Siga o que considera boas práticas de programação, coisas que um bom desenvolvedor olhe no seu código e não ache "feio" ou "ruim".
6.	Após concluir o teste envie o link do git ou o projeto zipado para o e-mail que te enviou o teste. 