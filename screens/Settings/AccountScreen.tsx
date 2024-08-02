import {useWindowDimensions} from "react-native";
import {NavigationState, Route, SceneMap, SceneRendererProps, TabBar, TabView} from "react-native-tab-view";
import {useState} from "react";
import AccountSettings from "@/components/AccountSettings/AccountSettings";
import PersonalSettings from "@/components/AccountSettings/PersonalSettings";
import {StyledText} from "@/components/StyledComponents/StyledComponents";
import clsx from "clsx";
import {useColorScheme} from "nativewind";
import COLORS from "@/constants/theme/colors";

const renderScene = SceneMap({
    accountInformation: AccountSettings,
    personalInformation: PersonalSettings,
});
const renderTabBar = <T extends Route>(props: SceneRendererProps & {navigationState: NavigationState<T>}) => {
    const {colorScheme} = useColorScheme()
    return (
        <TabBar {...props} renderLabel={({route, focused, color}) => (
            <StyledText
                className={clsx('font-bold', focused ? 'text-black dark:text-white' : 'text-slate-300 dark:text-slate-500')}>{route.title}</StyledText>
        )}
                indicatorStyle={{borderStyle: 'solid', borderWidth: 1, borderColor: colorScheme === 'dark' ? COLORS.dark.white : COLORS.light.black}}
                indicatorContainerStyle={{backgroundColor: COLORS[colorScheme].primary}}
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