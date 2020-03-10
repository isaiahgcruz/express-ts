import * as bodyParser from 'body-parser';
import { Server } from '@overnightjs/core';
import { Logger } from '@overnightjs/logger';
import * as controllers from './controllers';

class App extends Server {
  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.setupControllers();
  }

  private setupControllers(): void {
    const controllerInstances = Object.keys(controllers).map((key) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const Controller = (controllers as any)[key];
      return new Controller();
    });
    super.addControllers(controllerInstances);
  }

  public start(port: number): void {
    const message = `Server running on port ${port}`;

    this.app.get('*', (req, res) => {
      res.send(message);
    });

    this.app.listen(port, () => {
      Logger.Imp(message);
    });
  }
}

export default App;
