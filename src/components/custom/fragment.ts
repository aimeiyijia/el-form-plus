import Vue, { FunctionalComponentOptions, RenderContext, CreateElement } from 'vue'
export const Fragment: FunctionalComponentOptions<{}> = {
  functional: true,
  render: (h: CreateElement, context: RenderContext<{}>) => context.children
}

Vue.component('Fragment', Fragment)
