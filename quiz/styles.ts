import { StyleSheet, StatusBar } from "react-native";

const THEME1 = {
    yellow: '#f2bd4d',
    orange: '#ec5d37',
    blue: '#0da9b1',
    light: '#ffedd4',
    green: '#004649',
}
const THEME2 = {
    navy: '#3e4f6b',
    brown: '#302d2c',
    light: '#f2e4d0',
    tan: '#eacaa4',
    orange: '#f35519',
    yellow: '#fdd15b',
    blue: '#9fc9c1',
}

export const WIDTH = 350;

export const STYLES = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        backgroundColor: THEME1.light,
    },
    main: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: THEME1.light,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: WIDTH,
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: WIDTH,
    },
    footerTitle: {
        paddingTop: 10,
        fontSize: 20,
        fontFamily: 'Rye_400Regular',
        color: THEME1.blue,
    },
    headerTitle: {
        paddingTop: 10,
        fontSize: 25,
        fontFamily: 'Rye_400Regular',
        textTransform: 'uppercase',
        color: THEME1.blue,
    },
    title: {
        width: WIDTH,
        paddingBottom: 40,
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Rye_400Regular',
        textTransform: 'uppercase',
        color: THEME1.blue,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 60,
        fontFamily: 'Livvic_400Regular',
        color: THEME1.orange,
        width: WIDTH,
    },
    question: {
        textAlign: 'left',
        fontSize: 25,
        fontFamily: 'Rye_400Regular',
        textTransform: 'uppercase',
        color: THEME1.orange,
        paddingBottom: 20,
        width: WIDTH,
    },
    answerBox: {
        width: WIDTH,
        padding: 20,
        margin: 10,
        borderRadius: 10,
        backgroundColor: THEME1.yellow,
    },
    answerSelected: {
        backgroundColor: THEME1.orange,
    },
    answerText: {
        fontSize: 20,
        fontFamily: 'Livvic_400Regular',
        color: THEME1.green,
    },
    answerSelectedText: {
        color: THEME1.light,
    },
    button: {
        marginTop: 40,
        padding: 15,
        backgroundColor: THEME1.yellow,
        borderRadius: 10,
    },
    buttonText: {
        fontSize: 15,
        textTransform: 'uppercase',
        fontFamily: 'Rye_400Regular',
        color: THEME1.green,
    },
    buttonBlue: {
        backgroundColor: THEME1.blue,
    },
    buttonTextBlue: {
        color: THEME1.light,
    },
    infoText: {
        fontSize: 15,
        fontFamily: 'Rye_400Regular',
        color: THEME1.green,
        textAlign: 'center',
    },
});