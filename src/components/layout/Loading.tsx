import React from "react";
import { Spinner } from "@ui-kitten/components";
import { Dimensions, View } from "react-native";

/**
 * @description 화면을 로딩할 때 유저에게 Spinner를 표출하는 Component입니다.
 * @param {boolean} display Spinner를 표출할지 여부를 결정합니다.
 */
export default function Loading({ display = false }) {
    if (!display) return null;

    return (
        <View
            style={{
                width: Dimensions.get("screen").width,
                height: Dimensions.get("screen").height,
                position: "absolute",
                backgroundColor: "#00000099",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Spinner size="giant" status="basic" />
        </View>
    );
}
