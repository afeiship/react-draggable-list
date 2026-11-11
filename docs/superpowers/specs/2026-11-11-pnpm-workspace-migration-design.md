# pnpm workspace 迁移设计

日期：2026-11-11
状态：设计已确认，待复核后进入实现计划

## 1. 背景与目标

执行 `pnpm install` 时出现警告：`The "workspaces" field in package.json is not supported by pnpm. Create a "pnpm-workspace.yaml" file instead.`。当前根 `package.json` 使用 yarn/npm 风格的 `workspaces: ["packages/*"]`，pnpm 完全不识别，生成的 `pnpm-lock.yaml` 只有 `importers: .: {}`，`packages/example` 与 `packages/lib` 都没有进入依赖图；根脚本仍然通过 `cd ... && yarn run ...` 调用，属于半迁移状态。

目标：把本 monorepo 完整迁移到 pnpm workspace，同时保留 lerna（`lerna.json` 已改 `npmClient: pnpm`），使安装、本地链接、开发、构建与文档发布全部在 pnpm 下正常工作，且设计文档与站点产物可以共存于 `docs/`。

## 2. 决策

- 采用方案 A：保留 lerna，新增 `pnpm-workspace.yaml` 作为 pnpm 的唯一 workspace 声明。
- 不做运行时代码改动：不改 `packages/lib` 源码、不改组件行为、不发布、不推送远程。
- 提交信息使用英文；设计文档与对话文稿使用中文。

## 3. 改动清单

| 文件 | 改动 |
| --- | --- |
| `pnpm-workspace.yaml`（新增） | `packages: ['packages/*']` |
| `package.json` | 删除 `workspaces` 字段；5 个脚本由 `cd ... && yarn run ...` 改为 `pnpm --filter <包名> run <脚本>` |
| `lerna.json` | 保留 `npmClient: pnpm`，补充 `packages: ['packages/*']`（根 `workspaces` 删除后，lerna 需要明确的包来源） |
| `packages/example/package.json` | `@jswork/react-draggable-list` 由 `^1.0.0` 改为 `workspace:*`，强制链接本地 `packages/lib` |
| `.npmrc`（新增，后移除） | `enable-pre-post-scripts=true`（见第 10 节修正 4：pnpm 10 下为 no-op，已移除） |
| `pnpm-lock.yaml` | 重新执行 `pnpm install` 生成完整 lockfile 并提交（当前文件是残缺的） |
| `.gitignore` | 追加 `.superpowers` |
| `README.md` | 增加开发章节，说明 pnpm 安装、构建、启动、文档构建命令 |
| `llms.txt`（新增） | 实现阶段调用 `create-llms` skill 生成，并随代码改动同步更新 |
| `docs/superpowers/specs/2026-11-11-pnpm-workspace-migration-design.md` | 本设计文档 |

### 3.1 根脚本映射

| 脚本 | 迁移后命令 |
| --- | --- |
| `dev` | `pnpm --filter example run dev` |
| `presite` | `find docs -mindepth 1 -maxdepth 1 ! -name superpowers ! -name .gitkeep -exec rm -rf {} +` |
| `site` | `pnpm --filter example run build` |
| `postsite` | `cp -R packages/example/dist/. docs/` |
| `ln:build` | `pnpm --filter @jswork/react-draggable-list run build` |
| `ln:publish` | `pnpm --filter @jswork/react-draggable-list run release` |

> 修订：脚本名由 `docs/predocs/postdocs` 改为 `site/presite/postsite`。原因见第 10 节修正记录。

## 4. 关键约束与处理

### 4.1 pre/post 脚本执行（修正见第 10 节第 4 条）

初稿假设 pnpm 默认禁用任意 `pre*`/`post*` 脚本、需要 `.npmrc` 中 `enable-pre-post-scripts=true` 显式开启。代码质量审查在 pnpm 10.22.0 上 A/B 实测推翻了该假设：无论是否配置该项，`presite`/`postsite` 都会围绕 `site` 执行；该配置在 pnpm 10 中是 no-op（且会让 npm 读项目 `.npmrc` 时产生 unknown config 警告）。已移除 `.npmrc`，保留 `pre*`/`post*` 脚本结构不变。

### 4.2 设计文档与 docs 构建共存

`presite` 原本是 `rm -rf docs`，而设计文档按规范落在 `docs/superpowers/specs/`，下一次 `pnpm site` 会删除它。处理方式：

- `presite` 只清理 `docs/` 下除 `superpowers/` 与 `.gitkeep` 之外的一级条目，保留设计文档目录；
- `postsite` 由 `cp -R packages/example/dist docs` 改为 `cp -R packages/example/dist/. docs/`，把构建产物内容复制到已存在的 `docs/` 中，而不是生成 `docs/dist/`。GitHub Pages 的入口路径 `docs/index.html` 保持不变。

以 BSD `cp` 的 `源目录/.` 形式复制内容，可同时覆盖带点文件（如 `.nojekyll`），避免 `*` 通配遗漏。

## 5. 数据流

`pnpm install`（读取 `pnpm-workspace.yaml`，识别两个包，写入两个 importer 到 lockfile）→ `example` 通过 `workspace:*` 链接到 `packages/lib` → `pnpm ln:build` 产出 `dist/index.esm.js`、`dist/index.cjs.js`、`dist/index.d.ts` → `pnpm dev` 启动 vite / `pnpm site` 构建站点并复制到 `docs/` → 设计文档保留在 `docs/superpowers/`。

## 6. 验证（验收标准）

1. `pnpm install`：无 `workspaces` 警告；`pnpm-lock.yaml` 的 `importers` 同时包含 `packages/example` 与 `packages/lib`；`pnpm -r list --depth -1` 列出两个包。
2. `pnpm --filter example list --depth 0` 显示 `@jswork/react-draggable-list` 为 `link:../lib`。
3. `pnpm ln:build`：tsup 构建成功，三个 dist 入口文件存在。
4. `pnpm dev`：vite 正常启动（启动后检查本地端口可访问，再退出）。
5. `pnpm site`：`docs/index.html` 存在，且 `docs/superpowers/specs/2026-11-11-pnpm-workspace-migration-design.md` 仍存在。
5a. `pnpm --filter example exec tsc --noEmit` 退出码为 0（example 既有 TS 报错修复后）。
6. `git check-ignore .superpowers` 有输出；`pnpm-lock.yaml` 不再是未跟踪文件。

无新增运行时错误处理路径；以上命令即为本次迁移的测试。若任何一条失败，先修正配置再重新执行，不做"应该没问题"的声明。

## 7. 风险

- **供应链可复现性**：重新生成 lockfile 会重新解析全部依赖；当前 `lockfileVersion: '9.0'` 要求 pnpm 9+。必须提交 `pnpm-lock.yaml`，不能继续忽略它。
- **误装旧版组件**：`example` 依赖原本是 `^1.0.0`，而 `lib` 已发布到 `1.1.18`；`workspace:*` 保证 demo 始终使用本地源码。
- **发布流程**：`workspace:*` 只出现在私有包 `example` 中，`packages/lib` 内没有 workspace 依赖，release-it 发布不受影响。
- **破坏性命令**：`presite` 会对 `docs/` 一级条目执行 `rm -rf`，实现阶段执行前需先确认目标内容；该命令只作用于静态站点产物，不涉及源码。
- **lerna 依赖缺失**：`lerna` 当前未列入任何 `devDependencies`，`lerna.json` 的 `$schema` 是悬空引用。这是既有状态，本次不修。

## 8. 范围外

- 不改 `packages/lib` / `packages/example` 的组件运行行为。例外（修订，见第 10 节）：`packages/lib/package.json` 补声明幽灵依赖；`packages/example` 演示代码做最小 TypeScript 修复（仅类型标注与死代码清理，不改组件接口与交互）。
- 不新增测试框架、不改动 CI、不做版本发布、不推送远程。
- 不重构 `release-it` 配置与 tsup/vite 配置。

## 9. 后续

设计文档复核通过后，调用 `superpowers:writing-plans` 生成实现计划；实现阶段所有涉及代码的改动同步更新 `README.md` 与 `llms.txt`。

## 10. 修正记录（2026-11-11，代码质量审查后）

Task 1 实现通过规格审查后，代码质量审查发现两处**计划/设计自身缺陷**，均已由控制器在本机复现确认，修订如下：

1. **`docs` 脚本名与 pnpm 内置透传冲突（阻塞）**：pnpm 10 的 CLI 入口把 `argv[0]` 为 `docs`（以及 `home`、`info`、`view` 等）的裸命令硬编码转发给 npm（`passThruToNpm`），`npm docs` 会打开 `homepage` 并以退出码 0 结束——`predocs`/`docs`/`postdocs` 一个都不会执行。实测：裸 `pnpm docs` 无任何脚本运行；`pnpm run docs`、`pnpm -C <dir> docs` 正常。**修正**：脚本更名为 `site`/`presite`/`postsite`（不在透传列表，裸 `pnpm site` 可用），`docs/` 目录名与 GitHub Pages 入口不变。
2. **pnpm 严格解析暴露 `packages/lib` 幽灵依赖（阻塞 Task 3）**：`packages/lib/src/index.tsx` 引用 `@jswork/noop` 与 `classnames` 但 `package.json` 从未声明，yarn 扁平布局下碰巧可解析。**修正**：在 `packages/lib/package.json` 的 `dependencies` 补声明（钉版 `@jswork/noop@1.0.0`、`classnames@2.5.1`，对齐 lockfile 既有解析结果）。已实测：补声明后 lib 与 example 的全部 TS2307 消失。
3. **example 既有 TypeScript 报错（阻塞 Task 3）**：`tsc --noEmit` 另有 12 条既有报错（未使用的 `items1`/`items2`、`useState([])` 推断 `never`、`emptySlot` 传函数与 `React.ReactNode` 不匹配、`main.tsx` 冗余 `React` 导入）。yarn 时代从未真正跑通该检查链。**修正**：做最小 demo 修复——删除未用常量及其死注释 JSX、`useState` 加泛型、`emptySlot` 传元素、删除冗余导入；组件接口与交互不变。
4. **`enable-pre-post-scripts` 在 pnpm 10 下为 no-op（Task 2.5 审查发现）**：A/B 实测 pnpm 10.22.0 无论有无该配置，`presite`/`postsite` 均执行；pnpm 10 已不从 `.npmrc` 读取该键，且该行会让 npm 读项目 `.npmrc` 时报警告。**修正**：删除 `.npmrc`，§4.1 假设已订正。

原计划中所有 `pnpm docs` 验收命令相应改为 `pnpm site`。
