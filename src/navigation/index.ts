import { createStackNavigator } from "@react-navigation/stack";
import { RootStackParamList } from "./type";
export const RootStackNavigator = createStackNavigator<RootStackParamList>();
export type RootStackNavigatorType = typeof RootStackNavigator;
