import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ScreenWrapper from "../../components/ScreenWrapper";
import { hp } from "../../helpers/common";

const Notifications = () => {
  return (
    <ScreenWrapper bg="white">
      <View style={styles.container}>
        <Text>No New Notifications</Text>
      </View>
    </ScreenWrapper>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    alignItems: "center",
    marginTop: hp(20),
  },
});
