// eslint-disable-next-line @typescript-eslint/ban-types
class BaseBuilder<T extends unknown = {}> {
  public readonly result: T;

  constructor(private _target: T) {
    this.result = _target;
  }

  with<F extends keyof T>(field: Pick<T, F>): BaseBuilder<T> {
    Object.assign<T, Pick<T, F>>(this._target, field);
    return this;
  }
}

export default BaseBuilder;
