import { Decorator, Entity, Stats } from "./interfaces";
import { generateRandomStats } from "./uils";

abstract class DecoradorPersonaje implements Entity {
    nombre: any;
    ataque: number;
    salud: number;
    defensa: number;
    constructor(protected personaje: Entity, public stats: Stats) {
        this.nombre = personaje.nombre;
        this.ataque = stats.ataque;
        this.salud = stats.salud;
        this.defensa = stats.defensa;
    }

    abstract atacar(target:Entity, damage: number): string;
    abstract sanar(puntos: number): string;
    abstract cubrir(puntos: number): string;
    abstract getStats(): Stats;
    abstract atacado(damage: number): string;
}

export class DecoradorFuerza extends DecoradorPersonaje implements Decorator {
    constructor(personaje: Entity) {
        super(personaje, generateRandomStats(2,10,0,6,3,8));
    }

    atacar(target: Entity, damage: number): string {
        damage += this.ataque;
        return `${this.personaje.atacar(target, damage)} con fuerza sobrehumana.`;
    }

    sanar(puntos: number): string {
        this.stats.salud += puntos;
        return `${this.personaje.sanar(puntos)} más poderosamente.`;
    }

    cubrir(puntos: number): string {
        this.stats.defensa += puntos;
        return `${this.personaje.cubrir(puntos)} con un escudo de fuerza.`;
    }

    getStats(): Stats {
        return {
            ataque: this.ataque + this.personaje.getStats().ataque,
            salud: this.salud + this.personaje.getStats().salud,
            defensa: this.defensa + this.personaje.getStats().defensa,
        };
    }

    atacado(damage: number): string {
        return this.personaje.atacado(damage - this.defensa);
    }
}

export class DecoradorVelocidad extends DecoradorPersonaje implements Decorator {
    constructor(personaje: Entity) {
        super(personaje, generateRandomStats(0,6,1,7,2,4));
    }

    atacar(target:Entity, damage: number): string {
        return `${this.personaje.atacar(target, damage)} con velocidad sobrehumana.`;
    }

    sanar(puntos: number): string {
        return `${this.personaje.sanar(puntos)} más rápidamente.`;
    }

    cubrir(puntos: number): string {
        return `${this.personaje.cubrir(puntos)} con una protección mejorada.`;
    }

    getStats(): Stats {
        return {
            ataque: this.ataque + this.personaje.getStats().ataque,
            salud: this.salud + this.personaje.getStats().salud,
            defensa: this.defensa + this.personaje.getStats().defensa,
        };
    }

    atacado(damage: number): string {
        return this.personaje.atacado(damage - this.defensa);
    }
}

export class DecoradorMagia extends DecoradorPersonaje implements Decorator {
    constructor(personaje: Entity) {
        super(personaje, generateRandomStats(2,13,1,6,0,4));
    }

    atacar(target:Entity, damage: number): string {
        damage += this.ataque;
        return `${this.personaje.atacar(target, damage)} con magia.`;
    }

    sanar(puntos: number): string {
        this.stats.salud += puntos;
        return `${this.personaje.sanar(puntos)} más eficazmente.`;
    }

    cubrir(puntos: number): string {
        this.stats.defensa += puntos;
        return `${this.personaje.cubrir(puntos)} con una barrera mágica.`;
    }

    getStats(): Stats {
        return {
            ataque: this.ataque + this.personaje.getStats().ataque,
            salud: this.salud + this.personaje.getStats().salud,
            defensa: this.defensa + this.personaje.getStats().defensa,
        };
    }

    atacado(damage: number): string {
        return this.personaje.atacado(damage - this.defensa);
    }
}
