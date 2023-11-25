export default function localStorageAvailable() {
  try {
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);

    window.localStorage.removeItem(key);

    return true;
  } catch (err) {
    return false;
  }
}

export const storeDataToLocalStorage = (key: string, data: any) => {
  if (data) {
    localStorage.setItem(key, data);
  } else {
    localStorage.removeItem(key);
  }
};
