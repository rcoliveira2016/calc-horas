const migracoes: Record<string, (db: IDBDatabase) => void> = {
  "1": (db: IDBDatabase): void => {
    db.createObjectStore("historico", {
      keyPath: "uid",
      autoIncrement: false
    });
  },
}
export const getOpenSession = (): Promise<IDBDatabase> => {
  const openRequest = indexedDB.open("store", 1);
  return new Promise((resolve, reject) => {

    openRequest.onupgradeneeded = function (event) {
      const versionMigration = event.newVersion ?? event.oldVersion;
      console.log(versionMigration);
      if (typeof migracoes[versionMigration.toString()] === "function") {
      const db = openRequest.result;
        migracoes[versionMigration.toString()](db);
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
