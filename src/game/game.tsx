// Game.tsx

import React, { useEffect, useState } from 'react';
import { DecoradorFuerza, DecoradorMagia, DecoradorVelocidad } from './decorators';
import { Entity, Stats, Decorator } from './interfaces';
import { Enemigo, Heroe } from './gameObjects';
import './game.css';
import { generateRandomStats, getRandomInt } from './utils';

const Game: React.FC = () => {
    const [registro, setRegistro] = useState<string[]>([]);
    const [heroeDecoradores, setHeroeDecoradores] = useState<Decorator[]>([]);
    const [heroe, setHeroe] = useState<Entity>(
        new Heroe("Héroe", generateRandomStats(5,15,50,100,0,10))
    );
    const getRandomDecorator = (entity: Entity): Decorator => {
        const decorators = [DecoradorFuerza, DecoradorVelocidad, DecoradorMagia];
        const randomIndex = getRandomInt(0, decorators.length - 1);
        const DecoratorClass = decorators[randomIndex];
        return new DecoratorClass(entity);
    };
    const [enemigo, setEnemigo] = useState<Entity>(
        new Enemigo("Enemigo", generateRandomStats(5,15,50,100,0,10))
    );
    const [enemigoDecoradores, setEnemigoDecoradores] = useState<Decorator[]>(
        Array.from({ length: getRandomInt(1, 2) }, () => getRandomDecorator(enemigo))
    );

    const setRandomDecoratorsToEnemy = () => {
        const decorador = getRandomDecorator(enemigo);
        setEnemigo(decorador);
        setEnemigoDecoradores([...enemigoDecoradores, decorador]);
    }
    
    const realizarAccion = (accion: () => string, actor: string) => {
        const mensaje = accion();
        setRegistro([...registro, `${actor}: ${mensaje}`]);
    };

    const realizarTurno = () => {
        realizarAccion(() => heroe.atacar(enemigo, 0), 'Héroe');
        realizarAccion(() => enemigo.atacar(heroe, 0), 'Enemigo');
    };

    const addheroDecorator = () => {
        const decorador = getRandomDecorator(heroe);
        setHeroe(decorador);
        setHeroeDecoradores([...heroeDecoradores, decorador]);
        if (getRandomInt(1, 10) <= 7) {
            setRandomDecoratorsToEnemy();
        }
    }

    return (
        <div className="game-container">
            <div className="hero-stats">
                <h2>Héroe</h2>
                <p>{`Ataque: ${heroe.getStats().ataque}, Salud: ${heroe.getStats().salud}, Defensa: ${heroe.getStats().defensa}`}</p>
                <div>
                    <h3>Decoradores del Héroe (A, S, D)</h3>
                    {heroeDecoradores.map((decorador, index) => (
                        <p key={index}>{`${index + 1}. ${decorador.constructor.name} (${decorador.stats.ataque}, ${decorador.stats.salud}, ${decorador.stats.defensa})`}</p>
                    ))}
                </div>
                {
                    heroeDecoradores.length < 10 ?
                        <button onClick={() => addheroDecorator()}>
                            Obtener Decorador para el Héroe
                        </button>
                        :
                        <p>Ya tienes 10 decoradores</p>
                }
            </div>
            <div className="actions-container">
                <div>
                    <h2>Registro de Acciones</h2>
                    <ul className="action-list">
                        {registro.map((accion, index) => (
                            <li key={index} className="action-list-item">{accion}</li>
                        ))}
                    </ul>
                </div>
                <div className="enemy-stats">
                    <h2>Enemigo</h2>
                    <p>{`Ataque: ${enemigo.getStats().ataque}, Salud: ${enemigo.getStats().salud}, Defensa: ${enemigo.getStats().defensa}`}</p>
                    <div>
                        <h3>Decoradores del Enemigo (A, S, D)</h3>
                        {enemigoDecoradores.map((decorador, index) => (
                            <p key={index}>{`${index + 1}. ${decorador.constructor.name} (${decorador.stats.ataque}, ${decorador.stats.salud}, ${decorador.stats.defensa})`}</p>
                        ))}
                    </div>
                </div>
            </div>
            <div className="action-buttons">
                <button onClick={() => realizarAccion(() => heroe.atacar(enemigo, 0), 'Héroe')}>Atacar</button>
                <button onClick={() => realizarAccion(() => heroe.sanar(10), 'Héroe')}>Sanar</button>
                <button onClick={() => realizarAccion(() => heroe.cubrir(5), 'Héroe')}>Cubrir</button>
                <button onClick={realizarTurno}>Realizar Turno</button>
                <button onClick={() => realizarAccion(() => enemigo.atacar(heroe, 0), 'Enemigo')}>Atacar Enemigo</button>
            </div>
        </div>
    );
};

export default Game;
