import {useWindowDimensions} from "react-native";
import {SceneMap, TabBar, TabView} from "react-native-tab-view";
import {useState} from "react";
import AccountSettings from "@/components/AccountSettings/AccountSettings";
import PersonalSettings from "@/components/AccountSettings/PersonalSettings";
import {StyledText} from "@/components/StyledComponents/StyledComponents";
import clsx from "clsx";

const renderScene = SceneMap({
    accountInformation: AccountSettings,
    personalInformation: PersonalSettings,
});
const renderTabBar = (props) => {
    return (
        <TabBar {...props} renderLabel={({route, focused, color}) => (
            <StyledText
                className={clsx('font-bold', focused ? 'text-black' : 'text-slate-300')}>{route.title}</StyledText>
        )}
                indicatorStyle={{borderStyle: 'solid', borderWidth: 1, borderColor: '#000'}}
                indicatorContainerStyle={{backgroundColor: '#fff'}}
        />
    )
}

export function AccountScreen() {
    const layout = useWindowDimensions();

    const [index, setIndex] = useState(0);
    const [routes] = useState([
        {key: 'accountInformation', title: 'Dane konta'},
        {key: 'personalInformation', title: 'Pozostałe dane'},
    ]);
    return (
        <TabView
            navigationState={{index, routes}}
            renderScene={renderScene}
            onIndexChange={setIndex}
            renderTabBar={renderTabBar}
            initialLayout={{width: layout.width}}
        />
    );
}