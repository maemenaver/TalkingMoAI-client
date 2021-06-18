import "react-native-gesture-handler";
import React from "react";
import Routes from "./src/navigation";

// Import eva-design related things
import * as eva from "@eva-design/eva";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";

export default function App() {
    return (
        <>
            <IconRegistry icons={EvaIconsPack} />
            <ApplicationProvider {...eva} theme={eva.light}>
                <Routes />
            </ApplicationProvider>
        </>
    );
}
