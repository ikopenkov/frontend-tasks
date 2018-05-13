const lorem =
    'Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque voluptatum consequatur enim nemo, dolor eligendi numquam, quaerat, ipsam suscipit aut culpa reprehenderit facilis porro. Similique blanditiis eaque ab rerum aperiam.';
const loremWords = lorem
    .split(' ')
    .map(word => word.toLowerCase().replace(/(\.|,)/g, ''));

export const getRandomNumber = (from: number, to: number) =>
    from + Math.floor(Math.random() * to);

export const getRandomSentence = (length: number) => {
    const words = new Array(length)
        .fill(undefined)
        .map(() => loremWords[getRandomNumber(0, loremWords.length)]);

    let sentence = words.join(' ');
    sentence = sentence[0].toUpperCase() + sentence.slice(1) + '.';

    return sentence;
};
