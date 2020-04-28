import { Server } from './server';

async function main() {
    const server = new Server(3000);
    await server.listen();
}

main();
