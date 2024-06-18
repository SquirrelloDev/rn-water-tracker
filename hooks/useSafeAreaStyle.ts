import {useSafeAreaInsets} from "react-native-safe-area-context";

function useSafeAreaStyle() {
    const insets = useSafeAreaInsets()
    const insetsStyles = {
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right
    }
    return insetsStyles
}
export default useSafeAreaStyle