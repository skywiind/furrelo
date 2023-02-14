/*****************************************************
 * game.js
 * Defines the Game class and its associated methods.
 *****************************************************/

//Accepts two arrays of player IDs, boolean outcome, date/time, string for title
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

    getOutcome(players) {
        let result = '';
        let winners = [];
        let losers = [];
        
        result = this.outcome;
        //false = teamA won
        if (!result) {
            this.teamA.forEach(async (winner, i) => {
                winners[i] = await players.get(String(winner));
            });
            this.teamB.forEach(async (loser, i) => {
                losers[i] = await players.get(String(loser));
            });
            result = `Team A won.`;
        }
        else {
            this.teamB.forEach(async (winner, i) => {
                winners[i] = await players.get(String(winner));
            });
            this.teamA.forEach(async (loser, i) => {
                losers[i] = await players.get(String(loser));
            });
            result = `Team B won.`;
        }

        return `${result} The winners were: ${winners}. The losers were: ${losers}.`;

    }

}

module.exports = {
    Game: Game
}