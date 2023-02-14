/*****************************************************
 * player.js
 * Defines the player class and its associated methods.
 *****************************************************/

//Accepts a discord user ID, a string tag, an integer mmr, and a float winrate
class Player extends Object {
    constructor(id, tag, mmr, winrate) {
        super();
        this.id = id;
        this.tag = tag;
        this.mmr = mmr;
        this.winrate = winrate;
    }

    fromObject(obj) {
        if (!obj) {
            return undefined;
        }
        obj && Object.assign(this, obj);
        return this;
    }

    toString() {
        return JSON.stringify(this);
    }

    getInfo() {
        return `${this.tag} : ${this.mmr} MMR and ${this.winrate} WR.`;
    }
}

module.exports = {
    Player: Player
}