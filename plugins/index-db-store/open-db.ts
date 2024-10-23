import { migrations } from "./migrations-schema";


export const getOpenDb = (): Promise<IDBDatabase> => {
  const openRequest = indexedDB.open("store", 1);
  return new Promise((resolve, reject) => {

    openRequest.onupgradeneeded = function (event) {
      const versionMigration = event.newVersion ?? event.oldVersion;
      
      if (typeof migrations[versionMigration.toString()] === "function") {
      const db = openRequest.result;
        migrations[versionMigration.toString()](db);
      }
      
    };
    openRequest.onerror = function () {
      console.error("Error", openRequest.error);
      reject(openRequest.error);
    };
    openRequest.onsuccess = function (event) {      
      const db = openRequest.result;

      db.onversionchange = function () {
        db.close();
        console.error("Database is outdated, please reload the page.");
      };

      db.onabort = function () {
        db.close();
      }

      resolve(db);
    };
  })
};
