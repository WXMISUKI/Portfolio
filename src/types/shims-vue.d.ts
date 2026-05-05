declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@/components/ui' {
  import type { DefineComponent } from 'vue'
  const Button: DefineComponent<{}, {}, any>
  const Input: DefineComponent<{}, {}, any>
  const Tag: DefineComponent<{}, {}, any>
  const Card: DefineComponent<{}, {}, any>
  const Badge: DefineComponent<{}, {}, any>
  export { Button, Input, Tag, Card, Badge }
  export default {
    Button,
    Input,
    Tag,
    Card,
    Badge,
  }
}

declare module '@/components/layout' {
  import type { DefineComponent } from 'vue'
  const TheHeader: DefineComponent<{}, {}, any>
  const TheFooter: DefineComponent<{}, {}, any>
  const BackToTop: DefineComponent<{}, {}, any>
  export { TheHeader, TheFooter, BackToTop }
}
