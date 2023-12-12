export interface Stats {
    ataque: number;
    salud: number;
    defensa: number;
}

export interface Entity {
    nombre: any;
    atacar(target:Entity, damage: number): string;
    sanar(puntos: number): string;
    cubrir(puntos: number): string;
    getStats(): Stats;
    atacado(damage: number): string;
    stats: Stats;
}

export interface Decorator extends Entity, Stats {}