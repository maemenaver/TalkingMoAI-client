import React, { useEffect, useState } from "react";
import { GiftedChat, IMessage } from "react-native-gifted-chat";
import TalkingChat from "../../components/Talking/TalkingChat";
import firebase from "firebase";
import TalkingChatSend from "../../lib/Talking/chatSend";
import { firebaseConfig } from "../../../firebase";

export default function TalkingChatContainer() {
    // 내 정보의 default를 정의합니다.
    const [myProfile, setMyProfile] = useState({
        _id: "",
        name: "",
        avatar: "",
    });

    // text의 default, ""를 정의합니다.
    const [text, setText] = useState("");

    // chat의 default를 정의합니다.
    const [chat, setChat] = useState({
        step: 0,
        messages: [] as IMessage[],
        isTyping: false,
        loadEarlier: true,
        isLoadingEarlier: false,
    });

    // 메시지를 보냈을 때 호출되는 함수입니다.
    // currentMessages : 입력한 메시지를 파라미터로 받습니다.
    async function onSend(currentMessages = []) {
        // 지금까지 입력된 메시지를 가져옵니다.
        let messages = [...chat.messages];

        // 내가 보낸 메시지의 정보를 반영합니다.
        const newMessage = [
            {
                // 메시지 보낸 시각
                createdAt: new Date(),

                // 메시지의 ID
                _id: currentMessages[0]._id,

                sent: false,
                received: false,

                // 메시지의 text
                text: currentMessages[0].text,

                // 메시지의 유저 정보
                user: myProfile,
            },
        ];

        // 메시지를 반영합니다.
        messages = GiftedChat.append(messages, newMessage, true);
        setChat({ ...chat, messages, step: chat.step + 1 });

        // 메시지를 보냅니다.
        TalkingChatSend(currentMessages[0].text, myProfile._id).then(
            // 결과값을 불러옵니다.
            (newData) => {
                // 결과값이 없으면 서버 연결 실패를 알립니다.
                if (!newData) {
                    newData = [{}];
                    newData[0].type = "text";
                    newData[0].text = "모AI 서버와 연결을 실패했습니다.";
                }

                // 결과의 array 순서대로 확인합니다.
                for (let i = 0; i < newData.length; i++) {
                    // 결과 메시지의 정보를 선언합니다.
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

                    // 메시지를 반영합니다.
                    messages = GiftedChat.append(messages, newMessage, true);
                }

                // 메시지를 반영합니다.
                setChat({
                    ...chat,
                    messages,
                    step: chat.step + messages.length - 1,
                });
            }
        );
    }

    // useEffect Hook을 이용해
    // 컴포넌트가 렌더링 이후에 어떤 일을 수행해야 하는지 알려줍니다.
    useEffect(() => {
        // firebase config을 불러와서 초기화 합니다.
        firebase.initializeApp(firebaseConfig);
        // firebase 익명 로그인을 시도합니다.
        firebase
            .auth()
            .signInAnonymously()
            // 성공하면 다음 익명 함수를 호출합니다.
            .then(() => {
                // user.uid를 저장합니다.
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
            // 실패하면 다음 익명 함수를 호출합니다.
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        // 채팅 화면을 렌더링합니다.
        <TalkingChat
            myProfile={myProfile}
            chat={chat}
            text={text}
            setText={setText}
            onSend={onSend}
        />
    );
}
