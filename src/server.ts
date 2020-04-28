import Express, { Application } from 'express';
import morgan from 'morgan';

// Routes
import IndexRoutes from './routes/index.routes';
import PostsRoutes from './routes/posts.routes';


export class Server {

    private server: Application;
    //?: quiere decir que el parámetro es opcional
    // private en el constructor es lo mismo que declarar una varible dentro de la clase

    constructor(private port?: number | string) {
        this.server = Express();
        this.settings();
        this.middlewares();
        this.routes();
    }

    settings() {
        // se crea una configuracion llamada port
        // el valor puede ser el puerto enviado (this.port)
        // verificar si existe una variable de entorno y tómela (process.env.PORT) 
        // sino coloque 3000
        this.server.set('port', this.port || process.env.PORT || 3000);
    }

    middlewares() {
        // para mostrar mensajes de desarrollo 
        this.server.use(morgan('dev'));
        this.server.use(Express.json());
    }

    routes() {
        this.server.use(IndexRoutes);
        this.server.use('/posts', PostsRoutes);
    }

    // async await quiere decir que:
    // este código va tomar algo de tiempo de ejecución
    async listen() {
        // se envía como parámetro la configuración port
        await this.server.listen(this.server.get('port'));
        // una vez esté listo el servidor mostrar lo siguiente
        // contatenar a Server on port 3000
        console.log('Server on port', this.server.get('port'));
    }
}