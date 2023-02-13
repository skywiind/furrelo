/*****************************************************
 * game.js
 * Defines the Game class and its associated methods.
 *****************************************************/

//Accepts two arrays of player IDs, boolean outcome, date/time, string for title
//TODO: decide datetime module/format
//NOTE: maybe make title foreign key to other table? 
class Game extends Object {
    constructor(teamA, teamB, outcome, date, title) {
        super();
        this.teamA = teamA;
        this.teamB = teamB;
        this.outcome = outcome;
        this.date = date;
        this.title = title;
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
        // let output = '';

        // console.log(this.teamA.toString());

        // output.concat(this.teamA.toString(), ' ');
        // output.concat(this.teamB, ' ');
        // output.concat(this.outcome, ' ');
        // output.concat(this.date, ' ');
        // output.concat(this.title, ' ');

        // console.log(output);
        // return this.teamA.toString();
    }

}

module.exports = {
    Game: Game
}