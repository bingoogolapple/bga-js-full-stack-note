# 学习使用 vite 发布 ts 库

## package.json 说明

https://nodejs.cn/api/packages.html

- main 和 module：定义入口文件，项目在具备 ESM 规范情况下，module 具备更高的识别优先级
- publishConfig：在 publish 时，里面对应的入口会替换掉外层，一般本地开发时指向 src 目录，发布后指向 dist 目录
- types：组件的 TypeScript 类型描述，缺失会导致组件被引用时失去类型提示
- files：组件作为依赖项时会安装的目录/文件，支持正则匹配，默认会带上 4 项：package.json、README、LICENSE 和 主入口文件

## hmr 失效

- 问题：在 package.json 中配置 exports 后 hmr 失效

```txt
"exports": {
  ".": {
    "types": "./dist/src/index.d.ts",
    "import": "./dist/index.es.js",
    "require": "./dist/index.umd.js"
  },
  "./package.json": "./package.json"
},
```

- 解决方案：将 exports 里的配置改到 publishConfig 中

```txt
"publishConfig": {
  "registry": "https://registry.npmjs.org/",
  "access": "public",
  "main": "dist/index.umd.js",
  "module": "dist/index.es.js",
  "types": "dist/index.d.ts"
},
```

## 发布时多上传 xxx.ts 文件问题

- 问题：为了方便开发时 hmr 生效以及有类型公式，在 package.json 最外层配置了 main 执行 xxx.ts，导致发布时会把 xxx.ts 文件也发布到 npm 仓库

```txt
"main": "src/index.ts",
```

- 解决方案：将 main 配置删掉，改为配置 module 和 types

```txt
"module": "src/index.ts", // hmr 生效
"types": "src/index.ts", // 开发期间有类型提示
```

## 生成类型声明文件

- 方式 1：自己配置 tsconfig 来生成

  - 创建 tsconfig.node.json 来生成类型文件

    ```json
    {
      "extends": "./tsconfig.json", // 拓展 tsconfig.json 的配置
      "compilerOptions": {
        "noEmit": false, // 允许生成文件
        "declaration": true, // 需要设置为 true 来支持类型
        "emitDeclarationOnly": true, // 只生成类型文件
        "declarationDir": "dist" // 类型文件的导出目录
      },
      "include": ["src"] // 编译目标仅为 src 文件夹下的文件
    }
    ```

  - 修改 package.json 的 build 命令，在末尾追加 && tsc --p tsconfig.build.json

    ```txt
    "build": "tsc && vite build && tsc --p tsconfig.build.json",
    ```

- 方式 2：使用 [vite-plugin-dts](https://www.npmjs.com/package/vite-plugin-dts) 插件

  - 添加依赖

    ```shell
    pnpm add vite-plugin-dts -D
    ```

  - 配置 vite.config.ts

    ```ts
    plugins: [
      dts({
        entryRoot: 'src', // 这里指定下 entryRoot 为 src，避免 monorepo 场景下生成的 .d.ts 目录混乱
      }),
    ]
    ```

## 发布

- 登录指定 npm 服务器

```bash
pnpm login --registry https://registry.npmjs.org/
```

- 查看当前登录用户

```bash
pnpm whoami --registry https://registry.npmjs.org/
```

- 在 package.json 中通过 publishConfig.registry 指定要发布的 npm 服务器地址；通过 publishConfig.access 指定访问权限为 public，否则会发布失败

```json
"publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "access": "public"
}
```

- 或者在 .npmrc 中配置以下内容

```txt
registry=https://registry.npmjs.org/
access=public
```

- 构建

```bash
pnpm build
```

- 发布前检查

```bash
pnpm publish --dry-run
```

- 发布

```bash
pnpm publish
```
