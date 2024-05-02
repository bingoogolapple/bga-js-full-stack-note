# 学习发布 js 库

## package.json 说明

https://nodejs.cn/api/packages.html

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

- 发布前检查

```bash
pnpm publish --dry-run
```

- 发布

```bash
pnpm publish
```
