import { StyleSheet, StatusBar } from "react-native";

export const HOME_URL = 'https://corynathe.github.io/rubefest';

export const THEME1 = {
    yellow: '#f2bd4d',
    orange: '#ec5d37',
    blue: '#0da9b1',
    light: '#ffedd4',
    green: '#004649',
}
export const THEME2 = {
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
        fontSize: 45,
        fontFamily: 'Rye_400Regular',
        textTransform: 'uppercase',
        color: THEME1.blue,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: 50,
        fontFamily: 'Livvic_400Regular',
        color: THEME1.orange,
        width: WIDTH,
    },
    question: {
        textAlign: 'left',
        fontSize: 23,
        fontFamily: 'Rye_400Regular',
        textTransform: 'uppercase',
        color: THEME1.orange,
        paddingBottom: 20,
        paddingLeft: 5,
        paddingRight: 5,
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
        fontSize: 18,
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
        borderColor: THEME1.green,
        borderWidth: 1,
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
    buttonDisabled: {
        opacity: 0.5,
    },
    infoText: {
        fontSize: 15,
        fontFamily: 'Rye_400Regular',
        color: THEME1.green,
        textAlign: 'center',
    },
    infoText2: {
        fontSize: 20,
        fontFamily: 'Rye_400Regular',
        color: THEME1.green,
        textAlign: 'left',
    },
    error: {
        fontSize: 20,
        fontFamily: 'Livvic_400Regular',
        color: THEME1.orange,
        textAlign: 'center',
    },
    card: {
        border: 'solid 1px ' + THEME1.green,
        borderRadius: 15,
        padding: 10,
        marginTop: 20,
        marginBottom: 20,
    },
    card_orange: {
        backgroundColor: THEME1.orange,
    },
    card_blue: {
        backgroundColor: THEME1.blue,
    },
    card_yellow: {
        backgroundColor: THEME1.yellow,
    },
    cardText: {
        fontSize: 30,
        fontFamily: 'Rye_400Regular',
        color: THEME1.light,
        paddingLeft: 20,
    }
});

