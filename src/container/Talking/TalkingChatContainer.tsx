import React, { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import TalkingChat from "../../components/Talking/TalkingChat";
import firebase from "firebase";
import TalkingChatSend from "../../lib/Talking/chatSend";
import { firebaseConfig } from "../../../firebase";

export default function TalkingChatContainer() {
    const [myProfile, setMyProfile] = useState({
        _id: "",
        name: "",
        avatar: "",
    });

    const [text, setText] = useState("");

    const [chat, setChat] = useState({
        step: 0,
        messages: [] as IMessage[],
        isTyping: false,
        loadEarlier: true,
        isLoadingEarlier: false,
    });

    async function onSend(currentMessages = []) {
        let messages = [...chat.messages];

        const newMessage = [
            {
                createdAt: new Date(),
                _id: currentMessages[0]._id,
                sent: false,
                received: false,
                text: currentMessages[0].text,
                user: myProfile,
            },
        ];

        messages = GiftedChat.append(messages, newMessage, true);

        setChat({ ...chat, messages, step: chat.step + 1 });

        TalkingChatSend(currentMessages[0].text, myProfile._id).then(
            (newData) => {
                for (let i = 0; i < newData.length; i++) {
                    const newMessage = [
                        {
                            createdAt: new Date(),
                            _id: `${+new Date() + 1 + i}`,
                            sent: false,
                            received: false,
                            text: newData[i].type == "text" && newData[i].text,
                            image: newData[i].type == "image" && newData[i].url,
                            user: {
                                _id: `MoAI`,
                                name: `모AI`,
                                avatar:
                                    "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Moai_Rano_raraku.jpg/1200px-Moai_Rano_raraku.jpg",
                            },
                        },
                    ];

                    messages = GiftedChat.append(messages, newMessage, true);
                }

                setChat({
                    ...chat,
                    messages,
                    step: chat.step + messages.length - 1,
                });
            }
        );
    }

    useEffect(() => {
        firebase.initializeApp(firebaseConfig);
        firebase
            .auth()
            .signInAnonymously()
            .then(() => {
                firebase.auth().onAuthStateChanged((user) => {
                    if (user) {
                        const profile = {
                            _id: user.uid,
                            name: "나",
                            avatar: "https://picsum.photos/250/250",
                        };

                        setMyProfile(profile);
                    }
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <TalkingChat
            myProfile={myProfile}
            chat={chat}
            text={text}
            setText={setText}
            onSend={onSend}
        />
    );
}
