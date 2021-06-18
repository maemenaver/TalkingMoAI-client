import React from "react";
import {
    View,
    SafeAreaView,
    StyleSheet,
    Dimensions,
    StatusBar,
} from "react-native";

import TopNavigationBar from "./TopNavigationBar";

export default function Screen(props) {
    const {
        title = "",
        renderNavigationBar = true,
        transparent = false,
        leftButton = "back",
        rightButton = "hide",
        horizontalPadding = true,
        enableSafeAreaView = true,
        decoratedBackground = false,
        backgroundColor = "#ffffff",
        navigationBarAssetColor = "#000000",
        onRightButtonPress = null,
        statusBarStyle = "dark-content",
    } = props;

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 0,
            backgroundColor: decoratedBackground
                ? "#00000000"
                : backgroundColor,
        },

        contents: {
            flex: 1,
            paddingRight: horizontalPadding
                ? Dimensions.get("screen").width * 0.05
                : 0,
            paddingLeft: horizontalPadding
                ? Dimensions.get("screen").width * 0.05
                : 0,
        },
    });

    return (
        <>
            <StatusBar barStyle={statusBarStyle} />
            <View style={styles.container}>
                {renderNavigationBar && (
                    <TopNavigationBar
                        transparent={transparent}
                        title={title}
                        renderLeftButton={leftButton !== "hide"}
                        leftButtonType={leftButton}
                        renderRightButton={rightButton !== "hide"}
                        rightButtonType={rightButton}
                        onRightButtonPress={onRightButtonPress}
                        navigationBarAssetColor={navigationBarAssetColor}
                    />
                )}
                {enableSafeAreaView ? (
                    <View style={styles.contents}>
                        <SafeAreaView style={{ flex: 1 }}>
                            {props.children}
                        </SafeAreaView>
                    </View>
                ) : (
                    <View style={styles.contents}>{props.children}</View>
                )}
            </View>
        </>
    );
}
