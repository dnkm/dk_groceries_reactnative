import { View, Text } from "react-native";
import { useState, useEffect } from "react";
import { useParams } from "react-native-router";

export default function Stores() {
  const param = useParams();

  return (
    <View>
      <Text>Stores</Text>
    </View>
  );
}
