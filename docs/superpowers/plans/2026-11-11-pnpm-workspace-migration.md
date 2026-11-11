# pnpm workspace 迁移 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 把 `react-draggable-list` monorepo 完整迁移到 pnpm workspace，让安装、本地链接、构建、开发与 docs 发布在 pnpm 下全部可用，且设计文档不被 docs 构建删除。

**Architecture:** 新增 `pnpm-workspace.yaml` 作为 pnpm 的唯一 workspace 声明，删除根 `package.json` 的 `workspaces` 字段，保留 lerna 并补 `packages`。根脚本改为 `pnpm --filter <包名> run <脚本>`，`example` 用 `workspace:*` 链接本地 `lib`。通过 `.npmrc` 开启 pre/post 脚本，并让 `presite` 只清理站点产物、保留 `docs/superpowers/`。

**Tech Stack:** pnpm 10.22.0、lerna、TypeScript、tsup、Vite 4、React 18、release-it、GitHub Pages、BSD/macOS 命令行工具（`find`、`cp -R`、`rm -rf`）。

> **修订记录（2026-11-11）**：Task 1 代码质量审查发现两处计划缺陷（详见设计文档第 10 节）：① 裸 `pnpm docs` 被 pnpm 硬编码透传给 npm（打开 homepage，不执行任何脚本），脚本更名为 `site`/`presite`/`postsite`；② pnpm 严格解析暴露 `packages/lib` 幽灵依赖与 example 既有 TS 报错，新增 Task 2.5 处理。Task 2.5 质量审查另发现 `enable-pre-post-scripts` 在 pnpm 10 下为 no-op（A/B 实测），`.npmrc` 已移除（设计文档第 10 节修正 4）。文中各处命令已同步更新。

参考设计文档：`docs/superpowers/specs/2026-11-11-pnpm-workspace-migration-design.md`。

---

## 文件结构

| 文件 | 职责 | 动作 |
| --- | --- | --- |
| `pnpm-workspace.yaml` | pnpm 识别 `packages/*` 的唯一来源 | 新建 |
| `.npmrc` | 开启 `pre*`/`post*` 脚本执行 | 新建 |
| `package.json` | 根脚本调度（不再声明 workspaces） | 修改 |
| `lerna.json` | lerna 的 npmClient 与 packages 声明 | 修改 |
| `packages/example/package.json` | 通过 `workspace:*` 链接本地 lib | 修改 |
| `pnpm-lock.yaml` | 完整记录两个 importer 的依赖图 | 重新生成并提交 |
| `.gitignore` | 忽略 `.superpowers` | 修改 |
| `README.md` | 增加 pnpm 开发命令说明 | 修改 |
| `llms.txt` | 仓库结构索引（调用 `create-llms` skill 生成） | 新建 |
| `docs/superpowers/plans/2026-11-11-pnpm-workspace-migration.md` | 本计划 | 新建 |
| `docs/index.html` 等站点产物 | `pnpm site` 的验证产物，不提交 | 生成后删除 |

**不改动**：`packages/lib/src/**`、`packages/example/src/**`、`tsup.config.ts`、`vite.config.ts`、`.release-it.json`。不发布、不推送远程。

**环境前置**：本机 `pnpm --version` 为 `10.22.0`。网络异常时可用 `http_proxy=http://127.0.0.1:9090 https_proxy=http://127.0.0.1:9090` 前缀。所有 `git commit` 信息用英文；本计划与文档用中文。

---

## Task 1: 建立 pnpm workspace 配置

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `.npmrc`
- Modify: `package.json:6-18`
- Modify: `lerna.json:1-5`
- Modify: `packages/example/package.json:28`
- Modify: `.gitignore:1-8`

- [ ] **Step 1: 写失败检查（确认当前警告仍在）**

Run:
```bash
pnpm install 2>&1 | tee /tmp/pnpm-install-before.log
grep -c 'The "workspaces" field in package.json is not supported by pnpm' /tmp/pnpm-install-before.log
```
Expected: `1`，且 `grep -A3 '^importers:' pnpm-lock.yaml` 仍只有 `.: {}`。

- [ ] **Step 2: 新建 `pnpm-workspace.yaml`**

```yaml
packages:
  - 'packages/*'
```

- [ ] **Step 3: 新建 `.npmrc`**

```ini
enable-pre-post-scripts=true
```

- [ ] **Step 4: 修改根 `package.json`**

删除 `workspaces` 字段（第 7-9 行），并把 `scripts` 整块替换为：

```json
{
  "name": "react-draggable-list",
  "homepage": "https://js.work",
  "version": "1.0.1",
  "description": "A simple draggable list component.",
  "private": true,
  "dependencies": {},
  "scripts": {
    "dev": "pnpm --filter example run dev",
    "presite": "find docs -mindepth 1 -maxdepth 1 ! -name superpowers ! -name .gitkeep -exec rm -rf {} +",
    "site": "pnpm --filter example run build",
    "postsite": "cp -R packages/example/dist/. docs/",
    "ln:build": "pnpm --filter @jswork/react-draggable-list run build",
    "ln:publish": "pnpm --filter @jswork/react-draggable-list run release"
  }
}
```

- [ ] **Step 5: 修改 `lerna.json`**

```json
{
  "$schema": "node_modules/lerna/schemas/lerna-schema.json",
  "version": "1.0.0",
  "npmClient": "pnpm",
  "packages": ["packages/*"]
}
```

- [ ] **Step 6: 修改 `packages/example/package.json` 第 28 行**

把：
```json
"@jswork/react-draggable-list": "^1.0.0"
```
改为：
```json
"@jswork/react-draggable-list": "workspace:*"
```

- [ ] **Step 7: 修改 `.gitignore`**

把第 1 行 `node_modules` 替换为：
```gitignore
node_modules
.superpowers
```

- [ ] **Step 8: 重新安装并验证警告消失、两个 importer 就位**

Run:
```bash
pnpm install 2>&1 | tee /tmp/pnpm-install-after.log
! grep -q 'The "workspaces" field in package.json is not supported by pnpm' /tmp/pnpm-install-after.log
grep -E '^\s+packages/(example|lib):' pnpm-lock.yaml
```
Expected: 第一条 `! grep` 成功（无输出）；第二条打印 `packages/example:` 与 `packages/lib:` 两行。

- [ ] **Step 9: 验证 workspace 链接与忽略规则**

Run:
```bash
pnpm -r list --depth -1
pnpm --filter example list --depth 0
git check-ignore .superpowers
```
Expected: 第一条列出 `example@1.0.0` 与 `@jswork/react-draggable-list@1.1.18`；第二条包含 `link:../lib`；第三条打印 `.superpowers`。

- [ ] **Step 10: Commit**

```bash
git add pnpm-workspace.yaml .npmrc package.json lerna.json packages/example/package.json .gitignore pnpm-lock.yaml
git commit -m "build: migrate to pnpm workspace"
```

> **Task 1R 返工（修订后）**：脚本名 `docs/predocs/postdocs` → `site/presite/postsite`（Step 4 的 JSON 已更新为最终形态）。返工提交：
> ```bash
> git add package.json
> git commit -m "build: rename docs scripts to site to avoid pnpm npm-passthrough"
> ```

---

## Task 2: 更新 README 与生成 llms.txt

**Files:**
- Modify: `README.md:9`（在 `## installation` 之前插入开发章节）
- Create: `llms.txt`

- [ ] **Step 1: 在 `README.md` 插入开发章节**

在 `# react-draggable-list` 标题与 `## installation` 之间插入以下 markdown（其中代码块用普通三反引号 ```` ``` ````）：

````markdown
## development
> This repo uses pnpm workspace (`pnpm-workspace.yaml`) with lerna.

```shell
pnpm install
pnpm ln:build   # build packages/lib before running the example
pnpm dev        # start the vite example
pnpm site       # build the site into docs/ (keeps docs/superpowers/)
```

- `packages/example` links `@jswork/react-draggable-list` via `workspace:*`.
- `.npmrc` enables `pre`/`post` scripts so `presite` / `postsite` run under pnpm.
- The site script is named `site` (not `docs`): bare `pnpm docs` collides with pnpm's npm-passthrough and would open `homepage` instead of building.
- Do not use `yarn` or `npm install` in this repo.
````

- [ ] **Step 2: 调用 `create-llms` skill 生成 `llms.txt`**

调用 Skill 工具，skill 名为 `create-llms`，参数为当前仓库路径 `/Users/afei/github/react-draggable-list`。生成后确认 `llms.txt` 位于仓库根目录，且包含 `packages/lib`、`packages/example`、`pnpm-workspace.yaml` 与 `README.md` 的索引信息。

- [ ] **Step 3: 验证文档一致性**

Run:
```bash
grep -n 'pnpm-workspace.yaml\|workspace:\*\|enable' README.md
grep -n 'packages/lib\|packages/example\|pnpm-workspace.yaml' llms.txt
```
Expected: 两组 grep 都有输出，且 `README.md` 不再出现任何 `yarn run` 说明。

- [ ] **Step 4: Commit**

```bash
git add README.md llms.txt
git commit -m "docs: add pnpm development guide and llms.txt"
```

---

## Task 2.5: 幽灵依赖声明与 example 类型修复

> 修订新增（原因见设计文档第 10 节修正记录）：pnpm 严格解析暴露两处阻塞——`packages/lib` 未声明的运行时依赖、`packages/example` 既有的 12 条 TS 报错。不修则 Task 3 的 `site`/`dev`/`ln:build` 验收全部失败。

**Files:**
- Modify: `packages/lib/package.json:38-43`（dependencies 补两项）
- Modify: `packages/example/src/App.tsx`
- Modify: `packages/example/src/main.tsx`
- Modify: `pnpm-lock.yaml`（随 install 重新生成）

- [ ] **Step 1: 写失败检查**

Run:
```bash
pnpm --filter example exec tsc --noEmit 2>&1 | tee /tmp/tsc-before.log
grep -c "Cannot find module '@jswork/noop'" /tmp/tsc-before.log
grep -c "error TS6133" /tmp/tsc-before.log
```
Expected（取决于工作树起点）：若 lib 依赖尚未声明，第一条 grep 输出 `1`、第二条输出 `3`（items1、items2、main.tsx 的 React）；若控制器探针已把依赖声明留在工作树（TS2307 计数为 0、仅剩 12 条 example 报错），则视同"Step 2 已完成"的中间态，直接从 Step 3 继续，不回退探针。

- [ ] **Step 2: `packages/lib/package.json` 的 `dependencies` 补声明**

在 `"dependencies"` 中按字母序插入（钉版，对齐 lockfile 既有解析结果）：
```json
    "@jswork/noop": "1.0.0",
    "classnames": "2.5.1",
```

- [ ] **Step 3: 修复 `packages/example/src/App.tsx` 的既有类型错误**

1. 删除未使用的 `const items1 = [...]`（约 5-36 行）与 `const items2 = [...]`（约 38-73 行），以及文件末尾引用它们的注释掉的 JSX 死代码块（`{/* <ReactDraggableList ... */}` 段落，若存在）。
2. `const [sharedItems1, setSharedItems1] = useState([]);` 改为：
```ts
const [sharedItems1, setSharedItems1] = useState<{ id: number; title: string }[]>([]);
```
3. `emptySlot={() => <div>empty2</div>}` 改为 `emptySlot={<div>empty2</div>}`（与 `emptySlot={<div>empty1</div>` 的用法对齐，匹配 `React.ReactNode` 类型）。

- [ ] **Step 4: 修复 `packages/example/src/main.tsx`**

删除第一行未使用的 `import React from 'react';`（项目用 `react-jsx` 转换，无需显式导入）。

- [ ] **Step 5: 重装并验证类型检查通过**

Run:
```bash
pnpm install
pnpm --filter example exec tsc --noEmit
pnpm --filter @jswork/react-draggable-list exec tsc --noEmit -p tsconfig.json
```
Expected: 两条 tsc 均退出码 0、无输出。

- [ ] **Step 6: Commit**

```bash
git add packages/lib/package.json packages/example/src/App.tsx packages/example/src/main.tsx pnpm-lock.yaml
git commit -m "fix: declare lib runtime deps and repair example type errors"
```

---

## Task 3: 执行全部验收命令

**Files:**
- 无源码改动；验证 Task 1/2 的产物

- [ ] **Step 1: 构建 lib**

Run:
```bash
pnpm ln:build
ls -1 packages/lib/dist/index.esm.js packages/lib/dist/index.cjs.js packages/lib/dist/index.d.ts
```
Expected: tsup 输出成功；三个文件全部存在。

- [ ] **Step 2: 启动 dev 验证**

Run:
```bash
pnpm dev > /tmp/pnpm-dev.log 2>&1 &
echo $! > /tmp/pnpm-dev.pid
for i in $(seq 1 20); do grep -q 'Local:' /tmp/pnpm-dev.log && break; sleep 1; done
grep -E 'Local:|ready in' /tmp/pnpm-dev.log
curl -fsS http://localhost:5173/ -o /tmp/dev-index.html
kill "$(cat /tmp/pnpm-dev.pid)"
wait "$(cat /tmp/pnpm-dev.pid)" 2>/dev/null || true
```
Expected: 日志含 `Local:` 与 `ready in`；`curl` 成功；进程被正常终止。若端口被占用，读取 `/tmp/pnpm-dev.log` 中的实际端口并对该端口执行 `curl`。

- [ ] **Step 3: 验证 site 构建保留设计文档**

Run:
```bash
test -f docs/superpowers/specs/2026-11-11-pnpm-workspace-migration-design.md
pnpm site 2>&1 | tee /tmp/pnpm-site.log
test -f docs/index.html
test -f docs/superpowers/specs/2026-11-11-pnpm-workspace-migration-design.md
grep -E 'presite|postsite|vite|built' /tmp/pnpm-site.log | head -20
```
Expected: 全部 `test` 通过（无输出）；`docs/index.html` 存在；设计文档仍存在；日志显示 vite 构建成功。

- [ ] **Step 3a: 验证 example 类型检查通过**

Run:
```bash
pnpm --filter example exec tsc --noEmit
```
Expected: 退出码 0，无错误输出。

- [ ] **Step 4: 清理未提交的站点产物**

Run:
```bash
find docs -mindepth 1 -maxdepth 1 ! -name superpowers ! -name .gitkeep -exec rm -rf {} +
git status --short
```
Expected: `git status --short` 为空（工作树干净），`docs/superpowers/` 保留。

- [ ] **Step 5: 汇总验证结果**

Run:
```bash
git log --oneline -3
printf 'lockfile importers:\n'
grep -E '^\s+packages/(example|lib):' pnpm-lock.yaml
printf 'ignore:\n'
git check-ignore .superpowers
```
Expected: 最新提交为 `docs: add pnpm development guide and llms.txt`，其前为 `build: migrate to pnpm workspace`；两个 importer 与 `.superpowers` 忽略规则都在。

---

## Task 4: 提交实现计划文档

**Files:**
- Create: `docs/superpowers/plans/2026-11-11-pnpm-workspace-migration.md`

- [ ] **Step 1: 确认本计划文件已保存**

```bash
test -f docs/superpowers/plans/2026-11-11-pnpm-workspace-migration.md && wc -l docs/superpowers/plans/2026-11-11-pnpm-workspace-migration.md
```
Expected: 打印行数且无错误。

- [ ] **Step 2: Commit**

```bash
git add docs/superpowers/plans/2026-11-11-pnpm-workspace-migration.md
git commit -m "docs: add pnpm workspace migration plan"
```

> 注：若执行器采用 subagent-driven-development，本任务应在计划文件写入后由首个 subagent 之前完成提交；若采用 inline execution，则在 Task 1 之前先执行本任务。

---

## 自检结果（写入计划后由作者完成）

- **Spec 覆盖**：设计文档第 3 节改动清单 → Task 1；第 3.1 节脚本映射 → Task 1 Step 4；第 4.1 节 pre/post → Task 1 Step 3 + Task 3 Step 3；第 4.2 节 docs 共存 → Task 1 Step 4 + Task 3 Step 3/4；第 5 节数据流 → Task 1/3；第 6 节 6 条验收 → Task 1 Step 8/9 与 Task 3 Step 1/2/3/4/5；第 7 节风险 → `workspace:*`、lockfile 提交、predocs 清理范围均覆盖；第 9 节 README/llms.txt → Task 2。无缺口。
- **占位符扫描**：无 TBD/TODO/“appropriate error handling”/“similar to Task N”/仅描述不展示命令的步骤。
- **一致性**：包名 `example`、`@jswork/react-draggable-list` 在根脚本、`--filter`、`pnpm -r list`、`workspace:*` 中一致；`docs/superpowers/specs/2026-11-11-pnpm-workspace-migration-design.md` 路径在验证步骤中一致；`pnpm-lock.yaml` 的 importer 键 `packages/example`、`packages/lib` 与 `pnpm-workspace.yaml` 的 `packages/*` 一致。
- **已实测**：pnpm 10.22.0；`.npmrc` 开启后 `prefoo`/`postfoo` 均执行；BSD `find -mindepth/-maxdepth` 可用；`cp -R src/. dst/` 能复制点文件；scoped filter 可用。
