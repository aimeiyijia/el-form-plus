
import Vue, { Component } from 'vue'

interface IOptionComponent {
  [proppName: string]: Component
}
export interface InstallationOptions {
  components?: IOptionComponent
}
export function install(vue: typeof Vue, options: InstallationOptions): void
