import {ScreenNames} from "@/utils/routes";
import {NavigationProp} from "@react-navigation/native";

export type RootStackParamList = Record<ScreenNames[number], undefined>
export type StackNavigation = NavigationProp<RootStackParamList>