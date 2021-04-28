const Hapi = require('@hapi/hapi');
const routes = require('./routes');

const init = async () => {
    const server = Hapi.server({
        port: 5000,
        host: process.env.NODE_ENV !== 'production' ? 'localhost' : '172.31.36.19',
        routes: {
            cors: {
                origin: ['*'], //dapat dikonsumsi seluruh origin
            },
        },        
    });

    //memanggil module routes.js
    server.route(routes);

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};


init();