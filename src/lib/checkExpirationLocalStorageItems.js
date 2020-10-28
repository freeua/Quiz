import { apiResponsesStorage } from "./localForage.instance";

const checkExpirationLocalStorageItems = () => {
  apiResponsesStorage
    .iterate((value, key) => {
      if (value.expires) {
        if (new Date(value.expires) < new Date()) {
          apiResponsesStorage.removeItem(key);
        }
      }
    })
    .catch(error => console.error(error));
};

export default checkExpirationLocalStorageItems;
