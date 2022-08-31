import ElFormPlus from './form'
import _Vue, { PluginFunction, VueConstructor } from 'vue'

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean
}

const Components: { [key: string]: VueConstructor } = {
  ElFormPlus: ElFormPlus,
}

const install: InstallFunction = (Vue: typeof _Vue, options = {}) => {
  if (install.installed) return

  const { components = {} } = options

  Object.keys(Components).forEach((name: any) => {
    Vue.component(name, Components[name])
  })

  Object.keys(components).forEach((name: any) => {
    Vue.component(name, components[name])
  })

  install.installed = true
}

export default install
