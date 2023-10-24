import AsyncStorage from '@react-native-async-storage/async-storage';

export enum KeyStorage {
    isTurnOfIntro = 'isTurnOfIntro',
}

const get = async (key: KeyStorage): Promise<string | undefined> => {
    const value = await AsyncStorage.getItem(key);
    return value || undefined;
};

const set = async (key: KeyStorage, value: string) => {
    await AsyncStorage.setItem(key, value);
};

const remove = async (key: KeyStorage) => {
    await AsyncStorage.removeItem(key);
};

const Storages = {
    get,
    set,
    remove,
};

export default Storages;
