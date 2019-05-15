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
    this.matchId = this.generateMatchId(10);
    this.team1Id = team1Id;
    this.team2Id = team2Id;
  }

  generateMatchId(length) {
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
          matchId: this.matchId,
          teamId: winnerId
        });
      }, 1000 * (5 + Math.random() * 5));
    });
  };
}

class Round {
  constructor(teams) {
    this.teams = teams;
    this.noOfTeams = teams.length;
    this.noOfMatches = Math.floor(this.noOfTeams / 2);
    this.matches = [];
    this.teamsAlreadyScheduled = new Set();
    this.winners = [];
  }

  scheduleMatches = () => {
    // Takes the list of teams in this round.
    // Then schedules the matches.

    for (let index = 0; index < this.noOfMatches; index++) {
      // Create a match between two teams.
      let match = new Match(
        this.teams[2 * index].teamId,
        this.teams[2 * index + 1].teamId
      );
      this.matches.push(match);
    }

    this.showRoundDetails();
    console.log("The matches are", this.matches);
  };

  showRoundDetails() {
    // This function will update the dom to show match details
  }

  markTeamAsScheduled(teamIndex) {
    this.teamsAlreadyScheduled.add(teamIndex);
  }

  // getRandomTeamId(id = 0) {
  //   let randomTeamId = this.teams[id].teamId;

  //   while (this.teamsAlreadyScheduled.has(randomTeamId)) {
  //     console.log(id);
  //     randomTeamId = this.teams[id].teamId;
  //     id++;
  //   }
  //   this.markTeamAsScheduled(randomTeamId);

  //   return randomTeamId;
  // }

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
  constructor(teams, selector) {
    this.teams = teams;
    this.noOfTeams = teams.length;
    this.rounds = [];
    this.selector = selector;
    this.teamsMap = this.generateTeamsMap();
  }

  generateTeamsMap() {
    return this.teams.reduce((accumulator, current) => {
      accumulator[current.teamId] = current;
      return accumulator;
    }, {});
  }

  startTournament() {
    let self = this;
    let round = new Round(this.teams);
    this.rounds.push(round);
    console.log("Starting Round: ", this.rounds.length);

    round.startRoundMatches().then(winners => {
      self.teams = winners;
      console.log("Round Winners", winners);
      if (winners.length > 1) {
        setTimeout(() => self.startTournament(), 0);
      } else {
        console.log("Winner is", self.teams[0]);
      }
    });
  }
}

let teamList = [
  {
    teamId: 1610612737,
    abbreviation: "ATL",
    teamName: "Atlanta Hawks",
    simpleName: "Hawks",
    location: "Atlanta"
  },
  {
    teamId: 1610612738,
    abbreviation: "BOS",
    teamName: "Boston Celtics",
    simpleName: "Celtics",
    location: "Boston"
  },
  {
    teamId: 1610612751,
    abbreviation: "BKN",
    teamName: "Brooklyn Nets",
    simpleName: "Nets",
    location: "Brooklyn"
  },
  {
    teamId: 1610612766,
    abbreviation: "CHA",
    teamName: "Charlotte Hornets",
    simpleName: "Hornets",
    location: "Charlotte"
  },
  {
    teamId: 1610612741,
    abbreviation: "CHI",
    teamName: "Chicago Bulls",
    simpleName: "Bulls",
    location: "Chicago"
  },
  {
    teamId: 1610612739,
    abbreviation: "CLE",
    teamName: "Cleveland Cavaliers",
    simpleName: "Cavaliers",
    location: "Cleveland"
  },
  {
    teamId: 1610612742,
    abbreviation: "DAL",
    teamName: "Dallas Mavericks",
    simpleName: "Mavericks",
    location: "Dallas"
  },
  {
    teamId: 1610612743,
    abbreviation: "DEN",
    teamName: "Denver Nuggets",
    simpleName: "Nuggets",
    location: "Denver"
  },
  {
    teamId: 1610612765,
    abbreviation: "DET",
    teamName: "Detroit Pistons",
    simpleName: "Pistons",
    location: "Detroit"
  },
  {
    teamId: 1610612744,
    abbreviation: "GSW",
    teamName: "Golden State Warriors",
    simpleName: "Warriors",
    location: "Golden State"
  },
  {
    teamId: 1610612745,
    abbreviation: "HOU",
    teamName: "Houston Rockets",
    simpleName: "Rockets",
    location: "Houston"
  },
  {
    teamId: 1610612754,
    abbreviation: "IND",
    teamName: "Indiana Pacers",
    simpleName: "Pacers",
    location: "Indiana"
  },
  {
    teamId: 1610612746,
    abbreviation: "LAC",
    teamName: "Los Angeles Clippers",
    simpleName: "Clippers",
    location: "Los Angeles"
  },
  {
    teamId: 1610612747,
    abbreviation: "LAL",
    teamName: "Los Angeles Lakers",
    simpleName: "Lakers",
    location: "Los Angeles"
  },
  {
    teamId: 1610612763,
    abbreviation: "MEM",
    teamName: "Memphis Grizzlies",
    simpleName: "Grizzlies",
    location: "Memphis"
  },
  {
    teamId: 1610612748,
    abbreviation: "MIA",
    teamName: "Miami Heat",
    simpleName: "Heat",
    location: "Miami"
  },
  {
    teamId: 1610612749,
    abbreviation: "MIL",
    teamName: "Milwaukee Bucks",
    simpleName: "Bucks",
    location: "Milwaukee"
  },
  {
    teamId: 1610612750,
    abbreviation: "MIN",
    teamName: "Minnesota Timberwolves",
    simpleName: "Timberwolves",
    location: "Minnesota"
  },
  {
    teamId: 1610612740,
    abbreviation: "NOP",
    teamName: "New Orleans Pelicans",
    simpleName: "Pelicans",
    location: "New Orleans"
  },
  {
    teamId: 1610612752,
    abbreviation: "NYK",
    teamName: "New York Knicks",
    simpleName: "Knicks",
    location: "New York"
  },
  {
    teamId: 1610612760,
    abbreviation: "OKC",
    teamName: "Oklahoma City Thunder",
    simpleName: "Thunder",
    location: "Oklahoma City"
  },
  {
    teamId: 1610612753,
    abbreviation: "ORL",
    teamName: "Orlando Magic",
    simpleName: "Magic",
    location: "Orlando"
  },
  {
    teamId: 1610612755,
    abbreviation: "PHI",
    teamName: "Philadelphia 76ers",
    simpleName: "76ers",
    location: "Philadelphia"
  },
  {
    teamId: 1610612756,
    abbreviation: "PHX",
    teamName: "Phoenix Suns",
    simpleName: "Suns",
    location: "Phoenix"
  },
  {
    teamId: 1610612757,
    abbreviation: "POR",
    teamName: "Portland Trail Blazers",
    simpleName: "Trail Blazers",
    location: "Portland"
  },
  {
    teamId: 1610612758,
    abbreviation: "SAC",
    teamName: "Sacramento Kings",
    simpleName: "Kings",
    location: "Sacramento"
  },
  {
    teamId: 1610612759,
    abbreviation: "SAS",
    teamName: "San Antonio Spurs",
    simpleName: "Spurs",
    location: "San Antonio"
  },
  {
    teamId: 1610612761,
    abbreviation: "TOR",
    teamName: "Toronto Raptors",
    simpleName: "Raptors",
    location: "Toronto"
  },
  {
    teamId: 1610612762,
    abbreviation: "UTA",
    teamName: "Utah Jazz",
    simpleName: "Jazz",
    location: "Utah"
  },
  {
    teamId: 1610612764,
    abbreviation: "WAS",
    teamName: "Washington Wizards",
    simpleName: "Wizards",
    location: "Washington"
  },
  {
    teamId: 1610612723,
    abbreviation: "DAS",
    teamName: "Dallas Wizards",
    simpleName: "Dallas",
    location: "Denver"
  },
  {
    teamId: 1615612764,
    abbreviation: "TTA",
    teamName: "Toronto Tyrants",
    simpleName: "Tyrants",
    location: "Toronto"
  }
];

let selector = document.getElementById("tournament");

let tournament = new Tournament(teamList, selector);
tournament.startTournament();
