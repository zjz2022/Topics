next.js14废弃了getServerSideProp、getStaticProp等api
现在使用 fetch 的参数来决定渲染模式
SSR：指定fetch的第二个参数为{ cache: 'no-store' }
SSG：fetch默认为 cache: 'force-cache'也可以指定动态路径generateStaticParams

```js
// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const posts = await fetch('https://.../posts').then((res) => res.json())
 
  return posts.map((post) => ({
    slug: post.slug,
  }))
}
// app/blog/[slug]/page.js
// Multiple versions of this page will be statically generated
// using the `params` returned by `generateStaticParams`
export default function Page({ params }) {
  const { slug } = params
  // ...
}
```

ISR：指定fetch的第二个参数为{ revalidate: 'xxx秒' }
父布局和其子布局之间无法传递数据。然而，你可以在路由中多次获取相同的数据，React 会自动消除重复的请求，而不影响性能。