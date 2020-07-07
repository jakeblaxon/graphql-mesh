import { GraphQLSchema } from 'graphql';
import { MeshTransform, YamlConfig, MeshTransformOptions } from '@graphql-mesh/types';
import { loadFromModuleExportExpressionSync } from '@graphql-mesh/utils';
import {
  applySchemaTransforms,
  applyRequestTransforms,
  applyResultTransforms,
  Request,
  Result,
  Transform,
} from '@graphql-tools/utils';

export default class FilterTransform implements MeshTransform {
  private transforms: Transform[] = [];
  constructor(options: MeshTransformOptions<YamlConfig.Transform['custom']>) {
    const { config } = options;
    const mod = loadFromModuleExportExpressionSync(config.path, 'default');
    this.transforms.push(mod(...(config.params || [])));
  }

  transformSchema(schema: GraphQLSchema) {
    return applySchemaTransforms(schema, this.transforms);
  }

  transformRequest(request: Request) {
    return applyRequestTransforms(request, this.transforms);
  }

  transformResult(result: Result) {
    return applyResultTransforms(result, this.transforms);
  }
}
