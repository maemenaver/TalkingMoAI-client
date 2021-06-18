import React from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { View } from "react-native";

export default function TalkingChat({
    myProfile,
    chat,
    text,
    setText,
    onSend,
}) {
    return (
        <View style={{ flex: 1 }}>
            <GiftedChat
                user={myProfile}
                text={text}
                messages={chat.messages}
                // Indicate Functions
                onSend={onSend}
                onInputTextChanged={(text) => setText(text)}
                renderAvatarOnTop={true}
                alwaysShowSend={true}
                alignTop={false}
            />
        </View>
    );
}
