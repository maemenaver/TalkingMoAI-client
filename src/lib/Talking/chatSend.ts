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
            return null;
        });
}
