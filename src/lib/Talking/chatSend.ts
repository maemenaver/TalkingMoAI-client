import { Alert } from "react-native";
import axiosInstance from "../axiosInstance";

export default async function TalkingChatSend(message, userID) {
    const instance = axiosInstance();

    return await instance({
        url: "/config/tts",
        method: "POST",
        data: {
            message,
            userID,
        },
    })
        .then((res) => {
            return res.data;
        })
        .catch((err) => {
            Alert.alert("오류 발생", "오류가 발생했습니다.", [{ text: "OK" }], {
                cancelable: false,
            });
            return null;
        });
}
