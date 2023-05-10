import { Audio } from "expo-av";
import { SOUND } from "../screens/junior/Sound";


export const playDone = async () => {
    const { sound } = await Audio.Sound.createAsync(SOUND[12].sound);
    await sound.playAsync();
    return;
    };


export const playCorrect = async () => {
    const { sound } = await Audio.Sound.createAsync(SOUND[6].sound);
    await sound.playAsync();
    return;
};