# `@workspace/typescript-config`

Config files for typescript `tsconfig.json`.

### Setup

Edit the following files in the nextjs project to set the package.

Update `package.json` file

```json filename=package.json
{
  // ...
  "devDependencies": {
    // ...
    "@workspace/typescript-config": "workspace:*",
    // ...
  }
}
```

Update `tsconfig.json` file

```json filename=tsconfig.json
{
  "extends": "@workspace/typescript-config/nextjs",
  // ...
}
```

Install the dependancies

```bash
pnpm i
```

### Exports

- `@workspace/typescript-config/base`: Base TypeScript config file.
- `@workspace/typescript-config/nextjs`: TypeScript config for nextjs.
- `@workspace/typescript-config/react-library`: TypeScript config for react based package.