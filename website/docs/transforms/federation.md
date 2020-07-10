---
id: federation
title: Apollo Federation Transform
sidebar_label: Apollo Federation
---

`federation` transform allows to add the resolvers and directives to conform to the federation specification. Much of the federation sourcecode could be reused ensuring it is compliant to the specification. This transform uses [`graphql-transform-federation`](https://github.com/0xR/graphql-transform-federation) package.

```
yarn add @jakeblaxon-graphql-mesh/transform-federation
```

## How to use?

Add the following configuration to your Mesh config file:

```yml
transforms:
  - federation: 
        types:
            # Ensure the root queries of this schema show up the combined schema
            - name: Query
              config:
                extend: true
            - name: Product
              config:
                # extend Product {
                extend: true
                # Product @key(fields: "id") {
                keyFields:
                    - id
                fields:
                    # id: Int! @external
                    - name: id
                      external: true
                resolveReference:
                  targetSource: accounts
                  targetMethod: user
                  args:
                    id: root.id

```

### Add Reference Resolver as a Code File

If you want to add more complex business logic, you can point to a code file that exports a resolver function.

```yaml
resolveReference: ./userResolveReference.js
```

`./userResolveReference.js`
```js
// So we can point to an existing query field to resolve that entity
module.exports = (root, context) => context.accounts.api.user({ id: root.id })
```

{@import ../generated-markdown/FederationTransform.generated.md}
