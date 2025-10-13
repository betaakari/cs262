/**
 * RootLayout - Main app layout component using Expo Router
 *
 * This module defines the root navigation structure using Expo Router's
 * Stack navigator.
 *
 * Navigation Structure:
 * - index: List of all items
 * - details: Individual item details with delete functionality
 */

import React from "react";
import { Stack } from "expo-router";
import { commonStyles, headerConfig } from "../styles/common";

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{
                    title: "Available Items",
                    headerStyle: commonStyles.headerStyle,
                    headerTintColor: headerConfig.tintColor,
                }}
            />
            <Stack.Screen
                name="details"
                options={{
                    title: "Item Details",
                    headerStyle: commonStyles.headerStyle,
                    headerTintColor: headerConfig.tintColor,
                }}
            />
        </Stack>
    );
}
