import {
	MD3DarkTheme,
	MD3LightTheme,
	Provider as PaperProvider,
} from 'react-native-paper';
import { useColorScheme } from 'react-native';
import Navigation from './src/navigation';
import { StatusBar } from 'expo-status-bar';
import 'react-native-gesture-handler';
import { themeColors } from './src/constants/colors';
export default function App() {
	const colorScheme = useColorScheme();

	const paperTheme =
		colorScheme === 'dark'
			? { ...MD3DarkTheme, colors: themeColors.dark.colors }
			: { ...MD3LightTheme, colors: themeColors.light.colors };
	return (
		<PaperProvider theme={paperTheme}>
			<StatusBar translucent backgroundColor='rgba(0, 0, 0, 0.3)' />
			<Navigation />
		</PaperProvider>
	);
}
