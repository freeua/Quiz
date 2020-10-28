import { apiResponsesStorage } from "./localForage.instance";

const getDataFromStorage = async path => {
  try {
    const pathItem = await apiResponsesStorage.getItem(path);
    const { data } = pathItem;

    return data;
  } catch (error) {
    throw new Error("Сan not find a network connection");
  }
};

export default getDataFromStorage;
