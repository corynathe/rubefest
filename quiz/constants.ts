import { Question } from "./model";
import clown from '../assets/images/clown.png';
import lion from '../assets/images/lion.png';
import snake from '../assets/images/snake.png';
import magic from '../assets/images/magic-wand.png';
import ring from '../assets/images/ring.png';
import trapeze from '../assets/images/trapeze.png';
import unicycle from '../assets/images/unicycle.png';
import juggling from '../assets/images/juggling.png';
import tightrope from '../assets/images/tightrope-walker.png';

export const ACTION_TIMER = 1500;

export const TOTAL_QUESTIONS = 10;

export const QUESTIONS: Question[] = [{
    text: 'If you found yourself up on the tightrope, what would you say?',
    answers: [{
        text: 'GET ME DOWN!',
        points: 1,
    },{
        text: 'This isn\'t so bad.',
        points: 2,
    },{
        text: 'That net looks like it should catch me.',
        points: 3,
    },{
        text: 'HI MOM!',
        points: 4,
    }]
},{
    text: 'What snack would you choose at the circus?',
    answers: [{
        text: 'Cotton Candy',
        points: 1,
    },{
        text: 'Ice Cream',
        points: 2,
    },{
        text: 'Popcorn',
        points: 3,
    },{
        text: 'Peanuts',
        points: 4,
    }]
},{
    text: 'If you could pick any circus animal as a pet, which would you choose?',
    answers: [{
        text: 'Elephant',
        points: 1,
    },{
        text: 'Monkey',
        points: 2,
    },{
        text: 'Lion',
        points: 3,
    },{
        text: 'Tiger',
        points: 4,
    }]
},{
    text: 'If the circus needed a new musical act, would you...',
    answers: [{
        text: 'Run out the door as fast as you could',
        points: 1,
    },{
        text: 'Stay in your seat and clap along',
        points: 2,
    },{
        text: 'Join the back-up singers',
        points: 3,
    },{
        text: 'Run up on stage and grab the microphone',
        points: 4,
    }]
},{
    text: 'If you and your fellow clowns were getting into a tiny car, would you...',
    answers: [{
        text: 'Make a run for it',
        points: 1,
    },{
        text: 'Be the last one in',
        points: 2,
    },{
        text: 'Join them somewhere in the middle',
        points: 3,
    },{
        text: 'Be the first one in',
        points: 4,
    }]
},{
    text: 'If you couldn\'t pay for your circus ticket and had to work it off, would you...',
    answers: [{
        text: 'Sell popcorn at the concession stands',
        points: 1,
    },{
        text: 'Fold the acrobats tights',
        points: 2,
    },{
        text: 'Shovel the elephant poop',
        points: 3,
    },{
        text: 'Give the lion a bath',
        points: 4,
    }]
},{
    text: 'If you were the motorcycle driver jumping through the flaming hoops, would you...',
    answers: [{
        text: 'Get a fire extinguisher',
        points: 1,
    },{
        text: 'Use a stunt double',
        points: 2,
    },{
        text: 'Close your eyes and drive as fast as you can',
        points: 3,
    },{
        text: 'Add more hoops',
        points: 4,
    }]
},{
    text: 'If you were part of a famous juggling act, what would you juggle?',
    answers: [{
        text: 'Stuffed animals',
        points: 1,
    },{
        text: 'Bowling pins',
        points: 2,
    },{
        text: 'Torches lit on fire',
        points: 3,
    },{
        text: 'Knives',
        points: 4,
    }]
},{
    text: 'If you owned the circus, what would you name it?',
    answers: [{
        text: 'Under the Big Top',
        points: 1,
    },{
        text: 'Send in the Clowns',
        points: 2,
    },{
        text: 'Acro-glad You Are Here',
        points: 3,
    },{
        text: 'Lion Around All Day',
        points: 4,
    }]
},{
    text: 'If working for the circus made you rich, what would you do with the money?',
    answers: [{
        text: 'Let everyone in for free',
        points: 1,
    },{
        text: 'Put on even more shows',
        points: 2,
    },{
        text: 'Use it to buy more animals',
        points: 3,
    },{
        text: 'Take a nap',
        points: 4,
    }]
},{
    text: 'What drink would you choose at the circus?',
    answers: [{
        text: 'Bottled Water',
        points: 1,
    },{
        text: 'Blue Slushy',
        points: 2,
    },{
        text: 'Red Slushy',
        points: 3,
    },{
        text: 'Cold Beer',
        points: 4,
    }]
}];

export const FINAL_PERF_SIZE = 200;

export const PERFORMERS = [{
    name: 'Clown',
    points: 15,
    image: clown,
},{
    name: 'Juggler',
    points: 18,
    image: juggling,
},{
    name: 'Magician',
    points: 21,
    image: magic,
},{
    name: 'Unicyclist',
    points: 24,
    image: unicycle,
},{
    name: 'Ringmaster',
    points: 27,
    image: ring,
},{
    name: 'Trapeze Artist',
    points: 29,
    image: trapeze,
},{
    name: 'Tightrope Walker',
    points: 32,
    image: tightrope,
},{
    name: 'Lion Tamer',
    points: 35,
    image: lion,
},{
    name: 'Snake Charmer',
    points: 39,
    image: snake,
}];