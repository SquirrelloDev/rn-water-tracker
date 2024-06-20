import {Text, TextInput, TextInputProps, View} from "react-native";
import clsx from "clsx";
import {Ionicons} from "@expo/vector-icons";
import {styled} from "nativewind";
import {forwardRef} from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";

interface CustomTextInputProps<T extends FieldValues> extends TextInputProps {
    iconName?: string,
    isRequired?: boolean
    name: string,
    control: Control<T>
}

const StyledIcon = styled(Ionicons)

export const CustomTextInput = forwardRef(<T extends FieldValues>({placeholder, keyboardType, name, control, iconName, isRequired = false, ...props}: CustomTextInputProps<T>, ref) => (
    <Controller render={({field: {value, onBlur, onChange}, formState: {errors}, fieldState: {isTouched}}) => {
        const isError = errors[name]
        return (
            <View className={'relative'}>
                <Text className={clsx('ml-6 mb-1 font-bold text-base')}>{placeholder} {isRequired && <Text className='text-orange-400'>*</Text>}</Text>
                {iconName && <StyledIcon name={iconName} size={24}
                                         className={clsx('absolute z-10 top-1/2 left-5 -translate-y-1.5 text-slate-400', isError && '-translate-y-4 text-red-400')}/>}
                <TextInput placeholder={placeholder} value={value} ref={ref} onChangeText={(value) => onChange(value)}
                           onBlur={onBlur} keyboardType={keyboardType} {...props}
                           className={clsx('py-4  mx-3 mt-1 mb-2 bg-slate-200 rounded-full focus:border focus:border-blue-400',
                               iconName ? 'pl-9 pr-5' : 'px-5', isError && 'border border-red-400 bg-red-200')}/>
                {errors[name] && <Text className='text-red-500 mt-0.5 ml-6 mb-3'>{errors[name].message}</Text>}
            </View>
        )
    }} name={name as Path<T>} control={control}/>
))