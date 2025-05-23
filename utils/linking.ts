import { useCallback } from "react";
import { Linking } from "react-native";
export const handlePressLink = async (url?: string) => {
  if (!url) return;

  // Checking if the link is supported for links with custom URL scheme.
  const supported = await Linking.canOpenURL(url);

  if (supported) {
    // Opening the link with some app, if the URL scheme is "http" the web link should be opened
    // by some browser in the mobile
    await Linking.openURL(url);
  } else {
    //Alert.alert(`Don't know how to open this URL: ${urlToOpen}`);
  }
};
