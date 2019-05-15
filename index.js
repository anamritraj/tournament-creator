class Team {
  constructor(teamId, teamName, teamShortName, teamLocation) {
    this.teamId = teamId;
    this.teamName = teamName;
    this.teamShortName = teamShortName;
    this.teamLocation = teamLocation;
  }
}

class Match {
  constructor(team1Id, team2Id) {
    this.matchId = this.generateMatchId();
    this.team1Id = team1Id;
    this.team2Id = team2Id;
  }

  generateMatchId() {
    var result = "";
    var characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
  }

  // Return the winner after randomly between 5-6 seconds.
  getWinner = () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // If the random number generated is greater than 0.5 then winner is team1, otherwiser team2.
        let winnerId = Math.random() > 0.5 ? this.team1Id : this.team2Id;

        resolve({
          matchId: matchId,
          winnerId
        });
      }, 1000 * (5 + Math.random() * 5));
    });
  };
}

class Round {
  constructor(teams) {
    this.teams = teams;
    this.noOfTeams = teams.length;
    this.noOfMatches = this.noOfTeams / 2;
    this.matches = [];
    this.teamsAlreadyScheduled = new Set();
    this.winners = [];
  }

  scheduleMatches = () => {
    // Takes the list of teams in this round.
    // Then schedules the matches.

    for (let index = 0; index < this.noOfMatches; index++) {
      // Create a match between two teams.
      let match = new Match(this.getRandomTeamId(), this.getRandomTeamId());
      this.matches.push(match);
    }
  };

  markTeamAsScheduled(teamIndex) {
    this.teamsAlreadyScheduled.add(teamIndex);
  }

  getRandomTeamId() {
    let randomTeamId = this.teams[Math.floor(Math.random() * this.noOfTeams)]
      .teamId;

    while (this.teamsAlreadyScheduled.has(randomTeamId)) {
      randomTeamId = this.teams[Math.floor(Math.random() * this.noOfTeams)]
        .teamId;
    }
    this.markTeamAsScheduled(randomTeamId);

    return randomTeamId;
  }

  startRoundMatches() {
    this.scheduleMatches();

    return new Promise((resolve, reject) => {
      let matchPromises = [];

      this.matches.forEach(match => {
        matchPromises.push(match.getWinner());
      });

      Promise.all(matchPromises).then(results => {
        // Now we can proceed to the next round.
        // Create a new array of the teams that are going to the next round

        let winnerTeams = results.reduce((accumulator, currentValue) => {
          accumulator.push(currentValue);
          return accumulator;
        }, []);
        this.winners = winnerTeams;

        resolve(winnerTeams);
      });
    });
  }
}
class Tournament {
  constructor(teams) {
    this.teams = teams;
    this.noOfTeams = teams.length;
    this.rounds = [];
  }

  startTournament() {
    let winnersSize = this.noOfTeams / 2;
    console.log("Starting the tournament");
    while (winnersSize > 1) {
      console.log("winnersSize", winnersSize);
      let round = new Round(this.teams);
      this.rounds.push(round);

      round.startRoundMatches().then(winners => {
        winnersSize = winners.length / 2;
        this.teams = winners;
      });
    }
  }
}

let teamList = [
  {
    teamId: 1,
    teamName: "Team 1"
  },
  {
    teamId: 2,
    teamName: "Team 2"
  },
  {
    teamId: 3,
    teamName: "Team 3"
  },
  {
    teamId: 4,
    teamName: "Team 4"
  }
];

let tournament = new Tournament(teamList);
tournament.startTournament();
