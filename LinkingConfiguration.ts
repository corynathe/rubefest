import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

type RootStackParamList = {
    Quiz: undefined;
    Ball: undefined;
    Tarot: undefined;
    Home: undefined;
};

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Quiz: 'Quiz',
            Ball: 'Ball',
            Tarot: 'Tarot',
            Home: '*',
        },
    },
};

export default linking;
