import { npmConfigUtils } from "@yarnpkg/plugin-npm";
import { Configuration } from "@yarnpkg/core";

export async function getRegistry({
  scope,
  configuration,
}: {
  scope?: string;
  configuration: Configuration;
}) {
  if (scope) {
    return npmConfigUtils.getScopeRegistry(scope, { configuration });
  }

  return npmConfigUtils.getDefaultRegistry({ configuration });
}
