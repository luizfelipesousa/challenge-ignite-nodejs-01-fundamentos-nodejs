import { app } from "./app";

const server =  app

server.listen({
    host: '0.0.0.0',
    port: 3333
}).then(() => {
    return console.log('Server is up and running!🆙')
})