import API from "./axiosConfig";
import { quizzesStorage, personFormStorage } from "./localForage.instance";

const sendRequestQueue = async () => {
  (async () => {
    try {
      const keys = await quizzesStorage.keys();

      for await (const key of keys) {
        const quizResult = await quizzesStorage.getItem(key);

        await API.post(`/quiz/${quizResult.quizId}/new`, quizResult.quiz);
        await quizzesStorage.removeItem(key);
      }
    } catch (error) {
      console.error(error);
    }
  })();

  (async () => {
    try {
      const keys = await personFormStorage.keys();

      for await (const key of keys) {
        const personForm = await personFormStorage.getItem(key);

        await API.post(`/person`, personForm);
        await personFormStorage.removeItem(key);
      }
    } catch (error) {
      console.error(error);
    }
  })();
};

export default sendRequestQueue;
