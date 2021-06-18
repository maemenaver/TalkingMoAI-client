import React from "react";
import Screen from "../../components/layout/Screen";
import TalkingChatContainer from "../../container/Talking/TalkingChatContainer";

export default function TalkingScreen() {
    return (
        <>
            <Screen
                backgroundColor="#000000"
                title={"모AI"}
                transparent={false}
                horizontalPadding={false}
                enableSafeAreaView={false}
            >
                <TalkingChatContainer />
            </Screen>
        </>
    );
}
