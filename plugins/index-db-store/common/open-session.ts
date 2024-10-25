import { unwrapRequest } from "./unwrap-request";

export const getObjectStoreTransaction = (
  db: IDBDatabase,
  name: string,
  action: (objectStore: IDBObjectStore) => Promise<void>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(name, "readwrite");

    action(transaction.objectStore(name))
      .then(() => {
        console.log("Transaction success!");
        resolve();
      })
      .finally(() => {
        console.log("Transaction finished!");
        transaction.commit();
        db.close();  
      });
    
  });
};

export const getTransaction = (
  db: IDBDatabase,
  name: string,
  action: (objectStore: IDBTransaction) => Promise<void>
): Promise<void> => {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(name, "readwrite");

    action(transaction)
      .then(() => {
        console.log("Transaction success!");
        resolve();
      })
      .finally(() => {
        console.log("Transaction finished!");
        transaction.commit();
        db.close();
      });
  });
};


export const getObjectStoreValue = <T>(
  db: IDBDatabase,
  name: string,
  id: IDBValidKey
): Promise<T> => {
  return new Promise<T>(async (resolve, reject) => {
    const transaction = db.transaction(name);

    var data = await unwrapRequest(transaction.objectStore(name).get(id));
    db.close();
    resolve(data);
  });
};

export const getObjectStoreAllValues = <T>(
  db: IDBDatabase,
  name: string
): Promise<T[]> => {
  return new Promise<T[]>( async(resolve, reject) => {
    const transaction = db.transaction("historico");

    var data = await unwrapRequest(transaction.objectStore("historico").getAll());
    db.close();
    resolve(data);
  });
};
