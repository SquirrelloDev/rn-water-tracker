import {Alert, Pressable, View} from "react-native";
import {Ionicons} from "@expo/vector-icons";

export function AddEntryButton() {
    const outerPressableHandler = () => {
      return
    }
    return (
        <Pressable className='w-full items-center' onPress={outerPressableHandler}>
            <Pressable className="h-full w-12 justify-center items-center bg-teal-500 rounded-full"
                       onPress={() => Alert.alert('test')}>
                <Ionicons name={'add'} size={40} color={'#0000ff'}/>
            </Pressable>
        </Pressable>
    )
}