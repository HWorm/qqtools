import IndexedDB from 'indexeddb-tools';
import IndexedDBRedux from 'indexeddb-tools-redux';
import option from '../option/option';

const { indexeddb }: { indexeddb: Object } = option;

/* 初始化所有的数据库 */
IndexedDB(indexeddb.name, indexeddb.version, {
  success(event: Event): void {
    this.close();
  },
  upgradeneeded(event: Event): void {
    const objectStore: Array = indexeddb.objectStore;

    for (let i: number = 0, j: number = objectStore.length; i < j; i++) {
      const { name, key, data }: {
        name: string;
        key: string;
        data: ?Array;
      } = objectStore[i];

      if (!this.hasObjectStore(name)) {
        this.createObjectStore(name, key, data);
      }
    }
    this.close();
  }
});

export const db: IndexedDBRedux = new IndexedDBRedux(indexeddb.name, indexeddb.version);