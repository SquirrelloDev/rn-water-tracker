import {TextInput, TextInputProps} from "react-native";
import clsx from "clsx";
import {Ionicons} from "@expo/vector-icons";
import {styled} from "nativewind";
import {ForwardedRef, forwardRef} from "react";
import {Control, Controller, FieldValues, Path} from "react-hook-form";
import {StyledText, StyledTextInput, StyledView} from "@/components/StyledComponents/StyledComponents";

interface CustomTextInputProps<T extends FieldValues> extends TextInputProps  {
    iconName?: keyof typeof Ionicons.glyphMap,
    isRequired?: boolean
    name: string,
    control: Control<T>
}

const StyledIcon = styled(Ionicons)

export const CustomTextInput = forwardRef(<T extends FieldValues>({placeholder, keyboardType, name, control, iconName, isRequired = false, ...props}: CustomTextInputProps<T>, ref:ForwardedRef<TextInput>) => (
    <Controller render={({field: {value, onBlur, onChange}, formState: {errors}, fieldState: {isTouched}}) => {
        const isError = errors[name!]
        return (
            <StyledView className={'relative'}>
                <StyledText className={clsx('ml-6 mb-1 font-bold text-base')}>{placeholder} {isRequired && <StyledText className='text-orange-400'>*</StyledText>}</StyledText>
                {iconName && <StyledIcon name={iconName} size={24}
                                         className={clsx('absolute z-10 top-1/2 left-5 -translate-y-1.5 text-slate-400', isError && '-translate-y-4 text-red-400')}/>}
                <StyledTextInput placeholder={placeholder} value={value} ref={ref} onChangeText={(value) => onChange(value)}
                           onBlur={onBlur} keyboardType={keyboardType} {...props}
                           className={clsx('py-4  mx-3 mt-1 mb-2 bg-slate-200 rounded-full focus:border focus:border-blue-400',
                               iconName ? 'pl-9 pr-5' : 'px-5', isError && 'border border-red-400 bg-red-200')}/>
                {errors[name!] && <StyledText className='text-red-500 mt-0.5 ml-6 mb-3'>{`${errors[name!]?.message}`}</StyledText>}
            </StyledView>
        )
    }} name={name as Path<T>} control={control}/>
))