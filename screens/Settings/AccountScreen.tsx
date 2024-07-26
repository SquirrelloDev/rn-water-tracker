import {useWindowDimensions} from "react-native";
import {SceneMap, TabView} from "react-native-tab-view";
import {useState} from "react";
import AccountSettings from "@/components/AccountSettings/AccountSettings";
import PersonalSettings from "@/components/AccountSettings/PersonalSettings";

const renderScene = SceneMap({
    accountInformation: AccountSettings,
    personalInformation: PersonalSettings,
});

export function AccountScreen() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        { key: 'accountInformation', title: 'Dane konta' },
        { key: 'personalInformation', title: 'Pozostałe dane' },
    ]);
    return (
            <TabView
                navigationState={{ index, routes }}
                renderScene={renderScene}
                onIndexChange={setIndex}
                initialLayout={{ width: layout.width }}
            />
    );
}