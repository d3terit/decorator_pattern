import { Entity, Stats } from "./interfaces";

export class Heroe implements Entity {
    constructor(public nombre: string, public stats: Stats) {}

    atacar(target: Entity, damage: number): string {
        target.atacado(damage);
        return `${this.nombre} ataca a ${target.nombre}.`;
    }

    sanar(puntos: number): string {
        this.stats.salud += puntos;
        return `${this.nombre} se cura y recupera ${puntos} puntos de salud.`;
    }

    cubrir(puntos: number): string {
        this.stats.defensa += puntos;
        return `${this.nombre} se cubre y aumenta su defensa en ${puntos} puntos.`;
    }

    getStats(): Stats {
        return this.stats;
    }

    atacado(daño: number): string {
        this.stats.salud -= Math.max(0, daño - this.stats.defensa);
        return `${this.nombre} recibe ${Math.max(0, daño - this.stats.defensa)} puntos de daño.`;
    }
}

export class Enemigo implements Entity {
    constructor(public nombre: string, public stats: Stats) {}

    atacar(target: Entity, damage: number): string {
        target.atacado(damage);
        return `${this.nombre} ataca a ${target.nombre}.`;
    }

    sanar(puntos: number): string {
        this.stats.salud += puntos;
        return `${this.nombre} se cura y recupera ${puntos} puntos de salud.`;
    }

    cubrir(puntos: number): string {
        this.stats.defensa += puntos;
        return `${this.nombre} se cubre y aumenta su defensa en ${puntos} puntos.`;
    }

    getStats(): Stats {
        return this.stats;
    }

    atacado(daño: number): string {
        this.stats.salud -= Math.max(0, daño - this.stats.defensa);
        return `${this.nombre} recibe ${Math.max(0, daño - this.stats.defensa)} puntos de daño.`;
    }
}
