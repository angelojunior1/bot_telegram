# BOT TELEGRAM

Antes de tudo, certifique-se de ter o Node.js instalado. Você pode baixá-lo e instalá-lo a partir do [site oficial do Node.js](https://nodejs.org/).

<!-- Comando para instalar @prisma/client -->
npm install @prisma/client

<!-- Comando para instalar prisma como dependência de desenvolvimento -->
npm install prisma --save-dev

<!-- Comando para gerar os arquivos do Prisma -->
npx prisma generate

<!-- Comando para criar uma nova migration com nome 'initial' -->
npx prisma migrate dev --name initial

<!-- Comando para aplicar todas as migrações pendentes -->
npx prisma migrate deploy

<!-- Comando para iniciar Prisma Studio -->
npx prisma studio

<!-- Comando para iniciar o bot -->
node index.js

