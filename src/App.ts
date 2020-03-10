import * as bodyParser from "body-parser";
import { Server } from "@overnightjs/core";
import { Logger } from "@overnightjs/logger";

class App extends Server {
  constructor() {
    super(true);
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
  }

  public start(port: number): void {
    const message = `Server running on port ${port}`;

    this.app.get("*", (req, res) => {
      res.send(message);
    });

    this.app.listen(port, () => {
      Logger.Imp(message);
    });
  }
}

export default App;
