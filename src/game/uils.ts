import { Stats } from "./interfaces";

export const getRandomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const generateRandomStats = (
    minAtaque: number,
    maxAtaque: number,
    minSalud: number,
    maxSalud: number,
    minDefensa: number,
    maxDefensa: number
): Stats => {
    return {
        ataque: getRandomInt(minAtaque, maxAtaque),
        salud: getRandomInt(minSalud, maxSalud),
        defensa: getRandomInt(minDefensa, maxDefensa),
    };
}