
import { Interface } from 'readline'
import Vue, { Component } from 'vue'

interface IOptionComponent {
  [proppName: string]: Component
}
export interface InstallationOptions {
  components?: IOptionComponent
}
export function install(vue: typeof Vue, options: InstallationOptions): void

export class ElFormPlus {
  getTarget(options: [], fieldName: string): any
  setByField(options: [], fieldName: string, path: string, value: any): void
  isHasByField(options: [], fieldName: string, path: string): boolean
  insertByField(options: [], fieldName: string, path: string, value: any, positions: number): void
  emptysByField(options: [], fieldName: string, path: string): void
  getByField(options: [], fieldName: string, path: string, defaultValue: any): void
  delByField(options: [], fieldName: string, path: string): void
}
