import {Pressable, Text, View} from "react-native";
import clsx from "clsx";

interface CustomButtonProps {
    title: string
    onPress: () => void
    variant?: 'outline' | 'solid'
}

export default function CustomButton({title, onPress, variant = 'solid'}: CustomButtonProps) {
    return (
        <View className={clsx('mx-3 my-2.5 rounded-3xl')}>
            <Pressable onPress={onPress} android_ripple={{color: '#ccc', borderless: true}}
                       className={clsx('py-3 rounded-3xl active:opacity-75', variant === 'solid' ? 'bg-blue-400 ' : 'border border-blue-400')}>
                <Text
                    className={clsx('text-center text-base font-medium', variant === 'solid' ? 'text-white' : 'text-blue-400')}>{title}</Text>
            </Pressable>
        </View>
    )
}