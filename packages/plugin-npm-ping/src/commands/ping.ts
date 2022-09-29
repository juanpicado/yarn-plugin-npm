import { Command } from 'clipanion';
import {BaseCommand}   from '@yarnpkg/cli';
import {
  Configuration, StreamReport, MessageName
} from '@yarnpkg/core';
import {npmConfigUtils, npmHttpUtils} from '@yarnpkg/plugin-npm';

export default class PingCommand extends BaseCommand {
    static paths = [
        [`npm`, `ping`],
      ];

  public static usage = Command.Usage({
    description: 'Verify if the registry is online',
    details: `TBA`,
    examples: [
      [
        'Triggers a ping to the defined registry in .yamlrc file',
        'yarn npm ping',
      ]
    ],
  });

    
  public async execute() {
    const configuration = await Configuration.find(this.context.cwd, this.context.plugins);
    let registry: string = npmConfigUtils.getDefaultRegistry({configuration});
    const report = await StreamReport.start({
        configuration,
        stdout: this.context.stdout,
      }, async report => {
        let response;
        try {
          response = await npmHttpUtils.get(`/-/ping`, {
            configuration,
            registry,
            jsonResponse: true
          });
        } catch (err) {
            throw err;        
        }
        report.reportInfo(MessageName.UNNAMED, 'pong');
      });

      return report.exitCode();
  }
}
