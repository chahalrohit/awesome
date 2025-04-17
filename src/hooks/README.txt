Here's a comprehensive list of React and React Native hooks, with brief explanations and typical use cases for each:

✅ React Core Hooks (Used in React & React Native)

Hook Description Use Case
useState            -> Adds state to functional components. Toggle UI elements, track user inputs, etc.
useEffect           -> Performs side effects (e.g., API calls, subscriptions). Fetch data on mount, listen to state changes.
useContext          -> Consumes context without wrapper components. Theming, authentication, language preference.
useRef              -> Persists mutable values without re-rendering. Access DOM elements, track timers, or hold values between renders.
useCallback         -> Returns a memoized callback function. Prevents unnecessary re-renders of child components.
useMemo             -> Memoizes a value (expensive calculations). Optimize performance by caching calculated values.
useReducer          -> Manages complex state logic. Like Redux: ideal for multi-step forms, complex state transitions.
useLayoutEffect     -> Like useEffect, but fires synchronously after layout. Measure layout or apply layout changes before painting UI.
useImperativeHandle -> Customizes the instance exposed via ref. Useful with forwardRef for exposing imperative methods.
useDebugValue       -> Used for debugging custom hooks. Helpful for showing custom hook values in DevTools.

🪝 React Native Specific / Commonly Used Hooks
While React Native doesn’t have its own special hooks API (it shares the core React API), there are React Native-specific use cases and community hooks from libraries like react-native, react-navigation, and react-native-gesture-handler.

📱 React Native Core/Common Hooks

Hook Provided By Description Use Case
useWindowDimensions  -> React Native Returns current window width and height. Responsive layouts.
useColorScheme       -> React Native Detects current theme (light or dark). Theme switching.
useAnimatedStyle     -> react-native-reanimated Creates animated styles. Animate views smoothly.
useSharedValue       -> react-native-reanimated Shared value for animations. Interactive animations.
useNavigation        -> @react-navigation/native Access navigation object. Navigate, goBack, etc.
useRoute             -> @react-navigation/native Access route parameters. Get screen-specific props.
useIsFocused         -> @react-navigation/native Checks if screen is focused. Refresh data on screen focus.
useSafeAreaInsets    -> react-native-safe-area-context Access safe area (notch, bottom bar, etc.). Adjust padding for modern devices.
useBackHandler       -> @react-native-community/hooks Handle hardware back button on Android. Override back press behavior.
useDeviceOrientation -> @react-native-community/hooks Gets device orientation. Rotate layout/UI based on orientation.
useAppState          -> @react-native-community/hooks Monitor app state (active, background, etc.). Pause video, sync data on resume.
useNetInfo           -> @react-native-community/netinfo Checks network connection info. Show offline UI, retry logic.

🧩 Custom Hooks (User-defined)
You can also create your own hooks to encapsulate logic:

function useTimer(initial = 0) {
const [time, setTime] = useState(initial);
useEffect(() => {
const interval = setInterval(() => setTime(t => t + 1), 1000);
return () => clearInterval(interval);
}, []);
return time;
}
Use Case: Add a reusable timer across components.
