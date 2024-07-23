import {SectionList} from "react-native";
import {SettingSectionHeader} from "@/components/Settings/SettingSectionHeader";
import {SettingItem} from "@/components/Settings/SettingItem";
import settingSections from "@/constants/settings";

export function SettingsList() {
    return (
        <SectionList sections={settingSections} renderItem={({item}) => <SettingItem item={item}/>}
                     renderSectionHeader={({section}) => <SettingSectionHeader title={section.title}/>}
        />
    );
}