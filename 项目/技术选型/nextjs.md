## Vite

Vite 很显然是 create-react-app (CRA) 的继任者，因为它与 CRA 没有太大的区别。与 create-react-app（使用 Webpack）相比，它要快得多，因为它在底层使用了esbuild。

![图片](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/17192f41811d0f562c42338b06eeb887d9c373.png)

和 create-react-app (CRA) 一样，Vite 也更倾向于使用客户端路由和渲染来创建单页面应用（SPA）。然而，由于服务端渲染（SSR）越来越受到重视，因此在 Vite 中它作为一个可选功能提供。

![图片](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/c3c144e9045d1f5f5903877e10cadf68ba669b.png)

如果已经在使用 create-react-app（CRA），那么迁移到 Vite 是非常简单的。Vite 的 vite.config.js 文件以及特定功能的文件（例如 tsconfig）只需进行少量配置，就可以使用 TypeScript、ESLint 和 SSR 等可选功能了。

![图片](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/0569b3747a0788adbae5276382ffbd3dce69fe.png)

在 Vite 中允许开发者在没有框架的情况下使用 React。开发者可以自由选择用于路由、数据获取、状态管理和测试的 React 库。与所有 React 框架相比，它不会强制要求在项目级别上使用任何特定的 React 功能、库或配置。

Vite 鼓励初学者在没有框架的干扰下学习 React 及其基础知识。当使用 Vite 时，一个初学者可以专注于学习 React 和它的核心特性，而不需要受到框架的限制。相比之下，在使用框架的环境中学习 React 时，React 几乎处于被动状态，必须要遵循框架的意图来进行学习。

React + Vite 的优势：

- 几乎可以替代 create-react-app（CRA）
- 仍然支持 SPA/CSR，但 SSR 是可选的
- 没有框架/公司的束缚
- 轻量级
- 不会对 React 的功能进行干扰。因此，可以将重心放在 React 本身，而不是框架上
- 对于了解 React 基本原理的开发者来说，学习曲线比较平缓

React + Vite 的缺点：

- Vite 更注重单页应用（SPA）/客户端渲染（CSR）的支持。
- 没有框架的支持
- 无法使用 React 为集成框架提供的体系结构特性，例如 React 服务器组件（RSC）。

为什么 Vite 可能不会成为 React 文档中的默认工具：

- 它使用 SPA/CSR 而不是 SSR。
- 技术锁定使开发人员无法使用所有可用的 React 功能，比如 React 服务器组件（RSC）。
- 它不能贡献于以下愿景：构建一个 React 框架、实现多样化渲染技术、以及实现所有可用的 React 特性，例如 React 服务器组件（RSC）。
- 它不关注任何特定的框架（包括 React）。
- 对于 Vite 的创建者尤雨溪来说，React 并不是 Vite 的优先考虑。

## Next.js

Next.js 作为框架是最成熟的，因此当 React 开发人员想要在框架环境中使用 React 时，这可能是最好的选择。它包含许多内置的功能（例如基于文件的路由）。如果 Next.js不适合你，可以看看去年开源的 Remix 框架；它与 Next.js 的不同之处在于它专注于 Web 标准。

![图片](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/e52385f67b265f176720006da851d894242eb7.png)

Next.js 更注重服务端渲染（SSR）作为渲染技术。然而，它也可以与静态网站生成（SSG）和客户端渲染（CSR）一起使用。此外还有一些更先进的渲染技术可用，如增量静态再生（ISR）和 React 服务器组件（RSC）。另外，可以在 Next.js 应用中混合使用这些渲染技术。例如，一个营销页面可以使用 SSG，而注册/登录功能使用 SSR。

![图片](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/322b5b32243775736952088171ef28c0a8a71f.png)

然而，使用这么多强大的功能需要付出代价：不同的渲染技术会增加工程开销，框架不断地开发新的渲染技术，因此最终会改变其优先顺序，而且并不是所有开发者都能跟得上这个速度。尽管 Next.js 在过去没有引入破坏性变化，做得非常好，但在推动 JavaScript/React 渲染到后端的前沿工作中，总会有新的标准/配置。

总之，虽然 React 本身（例如使用Vite）相对稳定，但在 Next.js 生态系统中肯定会看到变化，因为它是将 React 引入服务端领域的开路先锋。

Next.js 的优点：

- 带有内置库的的框架
- SSR和许多其他渲染技术
- 提高性能
- 与CSR相比，具有改进的SEO
- Vercel 作为拥有大量资金的重要参与者
- 与 React 核心团队密切合作
- 雇用了许多 React 核心团队成员
- 在前沿领域工作

Next.js 的缺点：

- 与只使用 React + Vite 相比，会增加开销/稳定性/可维护性
- 相对于React + Vite，学习曲线更陡峭
- 更多关注框架特定内容，而非 React 本身
- 框架绑定

为什么 Next.js 可能是 React 文档中的默认选择：

- 它是最成熟的框架，符合 React 的框架的目标
- SSR 是一等公民，符合 React 的 SSR 目标
- 使用了React的所有基本原语，例如React Server Components (RSC)
- 不优先考虑“老式”SPA/CSR
- 与 React 及其核心团队密切关系，与React核心团队合作实现Next中的新功能，并最终由Meta/Facebook 使用