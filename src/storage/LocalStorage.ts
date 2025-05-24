export class LocalStorage<T>  {
  set(key: string, value: T): void {
    if (!value) return;
    localStorage.setItem(key, JSON.stringify(value));
  }
  get(key: string): T | null {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  }

  remove(key: string): void {
    localStorage.removeItem(key);
  }
}
