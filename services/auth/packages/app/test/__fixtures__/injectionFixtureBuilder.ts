// eslint-disable-next-line @typescript-eslint/ban-types
export class InjectionFixtureBuilder<T extends object> {
  public readonly result: T;

  constructor(private _target: T) {
    this.result = _target;
  }

  with<F extends keyof T>(field: Pick<T, F>): InjectionFixtureBuilder<T> {
    Object.assign<T, Pick<T, F>>(this._target, field);
    return this;
  }
}
