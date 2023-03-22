export default class HashMap<K, V> {
  private map: Map<string, V> = new Map();

  private hashFn: (key: K) => string;

  constructor(hashFn: (key: K) => string) {
    this.hashFn = hashFn;
  }

  has(key: K) {
    if (!key) return false;

    return this.map.has(this.hashFn(key));
  }

  set(key: K, value: V) {
    if (!key) return undefined;

    this.map.set(this.hashFn(key), value);
  }

  get(key: K) {
    if (!key) return undefined;

    return this.map.get(this.hashFn(key));
  }
}
