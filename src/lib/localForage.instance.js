import localForage from "localforage";

export const apiResponsesStorage = localForage.createInstance({
  name: "api-responses",
  storeName: "data",
  version: 1.0,
});

export const quizzesStorage = localForage.createInstance({
  name: "quizzes",
  storeName: "data",
  version: 1.0,
});

export const personFormStorage = localForage.createInstance({
  name: "person-forms",
  storeName: "data",
  version: 1.0,
});
