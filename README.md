# Configuração (Com Docker)
Clone o projeto: <br/>
`git clone https://github.com/WSF99/books-manager`<br/> <br/>

Crie e inicie os containers do Docker com: <br/>
`docker-compose up -d` <br/> <br/> Entre na CLI do container do <b>Server</b> que foi criado para criar e iniciar o migration: <br/> `yarn prisma migrate dev`<br/>

# Configuração sem Docker (Utilizando PostgreSQL)
Clone o projeto: <br/>
`git clone https://github.com/WSF99/books-manager`<br/> <br/>
Execute o comando `yarn install`<br/><br/>
Configure o arquivo <b>.env</b> com a porta e URL do banco de dados.<br/><br/>
Execute o comando `yarn prisma generate`<br/><br/>
Execute o comando `yarn prisma migrate dev`<br/><br/>
E por fim, rode com `yarn run dev` !
