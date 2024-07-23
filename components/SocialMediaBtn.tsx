import {IconButton} from "@/components/UI/IconButton";
import {StyledView} from "@/components/StyledComponents/StyledComponents";
import clsx from "clsx";
import {openURL} from "expo-linking";
import {socialMediaLinks, socialMediaStyles} from "@/constants/socialMedias";
interface SocialMediaBtnProps {
    smName: 'instagram' | 'facebook' | 'twitter' | 'youtube'
}

export function SocialMediaBtn({smName}: SocialMediaBtnProps) {
    return (
        <StyledView className={clsx('w-14 h-14 rounded-full justify-center items-center', socialMediaStyles[smName])}>
            <IconButton icon={`logo-${smName}`} onPress={() => {openURL(socialMediaLinks[smName])}} color={'#fff'} size={32}/>
        </StyledView>
    );
}