declare interface Options {
  uuid(): string

  id: string
}

export declare let defaults: Options

declare interface Depot {
  add(...items: object[]): Depot

  save(...items: object[]): Depot

  remove(...items: (object | string)[]): Depot

  empty(): Depot

  values(): object[]

  first(): object

  last(): object

  find(where: object): object

  size(): number
}

declare function depot(options: Options): Depot

export default depot
