export const unwrapRequest = <T>(request: IDBRequest<T>): Promise<T> => {
  return new Promise((resolve, reject) => {
    request.onerror = function () {
      console.error("Error", request.error);
      reject(request.error);
    };

    request.onsuccess = function () {
      resolve(request.result);
    };
  });
};
