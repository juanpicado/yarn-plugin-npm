import { Command, Option } from "clipanion";
import { BaseCommand } from "@yarnpkg/cli";
import { Configuration, StreamReport, MessageName } from "@yarnpkg/core";
import { npmHttpUtils } from "@yarnpkg/plugin-npm";
import { getRegistry } from "./npmUtils";

export default class PingCommand extends BaseCommand {
  static paths = [[`npm`, `ping`]];

  public static usage = Command.Usage({
    description: "Verify if the registry is online",
    details: `TBA`,
    examples: [
      ["Triggers a ping to the default public registry", "yarn npm ping"],
      [
        "Triggers a ping to the default public registry",
        "yarn npm ping --scope ",
      ],
    ],
  });

  json = Option.Boolean(`--json`, false, {
    description: `Format the output as an NDJSON stream`,
  });

  registry = Option.String(`--registry`, {
    description: `override the registry configuration`,
  });

  scope = Option.String(`--scope`, {
    description: `Specific registry to ping`,
  });

  public async execute() {
    const configuration = await Configuration.find(
      this.context.cwd,
      this.context.plugins
    );
    const configRegistry: string = await getRegistry({
      scope: this.scope,
      configuration,
    });
    const report = await StreamReport.start(
      {
        configuration,
        json: this.json,
        stdout: this.context.stdout,
      },
      async (report) => {
        let response;
        let time;
        const registry = this.registry ? this.registry : configRegistry;
        try {
          const start = Date.now();
          report.reportInfo(null, `ping ${registry}`);
          response = await npmHttpUtils.get(`/-/ping?write=true`, {
            configuration,
            registry,
            jsonResponse: true,
          });
          time = Date.now() - start;
        } catch (err) {
          throw err;
        }
        report.reportInfoOnce;
        report.reportInfo(MessageName.UNNAMED, `PONG ${time} ms`);
      }
    );

    return report.exitCode();
  }
}
