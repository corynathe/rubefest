import { LinkingOptions } from '@react-navigation/native';
import * as Linking from 'expo-linking';

type RootStackParamList = {
    Quiz: undefined;
    Ball: undefined;
    Maze: undefined;
    Home: undefined;
};

const linking: LinkingOptions<RootStackParamList> = {
    prefixes: [Linking.makeUrl('/')],
    config: {
        screens: {
            Quiz: 'Quiz',
            Ball: 'Ball',
            Maze: 'Maze',
            Home: '*',
        },
    },
};

export default linking;
