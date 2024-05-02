# bga-js-full-stack-note

JS 全栈开发学习笔记

```shell
pnpm -wD add @types/node typescript vite
```

## eslint、prettier

```shell
pnpm -wD add prettier eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-import eslint-plugin-node eslint-plugin-prettier eslint-plugin-promise eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-markdown
```

## husky、lint-staged

```shell
pnpm -wD add husky lint-staged
```

## commitlint、commitizen

```shell
pnpm -wD add pretty-format pretty-quick commitizen cz-conventional-changelog @commitlint/config-conventional @commitlint/cli
```

- husky 关联 lint-staged

```shell
pnpx husky add .husky/pre-commit "pnpx lint-staged"
```

- husky 关联 commitlint

```shell
pnpx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'
```

## tailwindcss

- 添加依赖

```shell
pnpm add -wD tailwindcss@latest postcss@latest autoprefixer@latest
```

- 初始化

```shell
npx tailwindcss init -p
```
