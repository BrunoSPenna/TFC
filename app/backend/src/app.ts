import * as express from 'express';
import TeamRoutes from './database/router/TeamRoutes';
import loginRoutes from './database/router/loginRoutes';
import matchesRouter from './database/router/matchesRouters';
import leaderBoardRouter from './database/router/leaderBoarderRoute';

class App {
  public app: express.Express;

  constructor() {
    this.app = express();

    this.config();
    this.initRoutes();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private initRoutes(): void {
    // console.log('oi');
    this.app.use(TeamRoutes);
    this.app.use(loginRoutes);
    this.app.use(matchesRouter);
    this.app.use(leaderBoardRouter);
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);
  }

  public start(PORT: string | number):void {
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };

// Essa segunda exportação é estratégica, e a execução dos testes de cobertura depende dela
export const { app } = new App();
// primeiro commit
