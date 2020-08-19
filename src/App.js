import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [tournament, setTournament] = useState({
    tournamentName: "",
    startingDate: "",
    endingDate: "",
    numberOfTeams: 0
  });

  const [numberTeams, setNumberTeams] = useState();
  const [grids, setGrids] = useState();
  const [grids1, setGrids1] = useState();
  const [grids2, setGrids2] = useState();
  const [grids3, setGrids3] = useState();
  const [grids4, setGrids4] = useState();
  const [grids5, setGrids5] = useState();

  const initialBracket = () => {
    const grid = loop(numberTeams);
    setGrids(grid);
    const grid1 = loop(numberTeams / 2);
    setGrids1(grid1);
    if (numberTeams >= 5) {
      const grid2 = loop(grid1.length / 2);
      setGrids2(grid2);
      if (numberTeams >= 9) {
        const grid3 = loop(grid2.length / 2);
        setGrids3(grid3);
        if (numberTeams >= 17) {
          const grid4 = loop(grid3.length / 2);
          setGrids4(grid4);
          if (numberTeams >= 33) {
            const grid5 = loop(grid4.length / 2);
            setGrids5(grid5);
          }
        }
      }
    }
  };

  const loop = entry => {
    const output = [];
    for (let grid = 0; grid < entry; grid++) {
      output.push(createGrid(grid));
    }
    return output;
  };

  const createGrid = grid => {
    return {
      grid
    };
  };

  const HandleChangeTName = event => {
    setTournament({
      ...tournament,
      tournamentName: event.target.value
    });
  };

  const HandleChangeTSDate = event => {
    setTournament({
      ...tournament,
      startingDate: event.target.value
    });
  };

  const HandleChangeTEDate = event => {
    setTournament({
      ...tournament,
      endingDate: event.target.value
    });
  };

  const HandleChangeNumbTeams = event => {
    setNumberTeams(event.target.value);
    setTournament({
      ...tournament,
      numberOfTeams: event.target.value
    });
  };

  /* TODO LIST:
  - User can see a warning if either the starting or ending date is invalid
  - User can see a warning if an odd number of competing teams is entered
  - User can enter the date for each match
  - User can enter the final score for each match
  - User can expect that this data will persist across sessions
  */

  return (
    <div className="App">
      <div className="container">
        <h1>Create Bracket Tournament</h1>
        <div className="form-group">
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Tournament-Name
              </span>
            </div>
            <input
              type="text"
              name="tournamentName"
              className="form-control"
              placeholder="Tournament-Name"
              aria-label="Tournament-Name"
              aria-describedby="basic-addon1"
              value={tournament.tournamentName}
              onChange={HandleChangeTName}
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Starting-Date / Ending-Date
              </span>
            </div>
            <input
              type="date"
              name="startingDate"
              value={tournament.startingDate}
              onChange={HandleChangeTSDate}
              className="form-control"
              aria-label="startingDate"
              aria-describedby="basic-addon1"
            />
            <input
              type="date"
              className="form-control"
              name="endingDate"
              value={tournament.endingDate}
              onChange={HandleChangeTEDate}
              aria-label="endingDate"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <div className="form-group">
          <div className="input-group mb-1">
            <div className="input-group-prepend">
              <span className="input-group-text" id="basic-addon1">
                Number of Teams
              </span>
            </div>
            <input
              type="number"
              name="numberOfTeams"
              value={tournament.numberOfTeams}
              onChange={HandleChangeNumbTeams}
              className="form-control"
              placeholder="Number-of-Teams"
              aria-label="Number-of-Teams"
              aria-describedby="basic-addon1"
            />
          </div>
        </div>
        <button className="btn btn-primary" onClick={() => initialBracket()}>
          Generate
        </button>
        <section>
          {tournament ? <h1>{tournament.tournamentName}</h1> : null}
          <div className="tournament-date">
            <span>
              {tournament.startingDate ? (
                <h2>{tournament.startingDate}</h2>
              ) : null}
            </span>
            <span>
              {tournament.endingDate ? <h2>{tournament.endingDate}</h2> : null}
            </span>
          </div>
          <div className="general-bracket">
            <div className="bracket-initial">
              {grids
                ? grids.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Team Name</span>
                      <input type="text" />
                    </div>
                  ))
                : null}
            </div>
            <div className="bracket-initial">
              {grids1
                ? grids1.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Team Name</span>
                      <input type="text" />
                    </div>
                  ))
                : null}
            </div>
            <div className="bracket-initial">
              {grids2
                ? grids2.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Team Name</span>
                      <input type="text" />
                    </div>
                  ))
                : null}
            </div>
            <div className="bracket-initial">
              {grids3
                ? grids3.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Team Name</span>
                      <input type="text" />
                    </div>
                  ))
                : null}
            </div>
            <div className="bracket-initial">
              {grids4
                ? grids4.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Team Name</span>
                      <input type="text" />
                    </div>
                  ))
                : null}
            </div>
            <div className="bracket-initial">
              {grids5
                ? grids5.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Team Name</span>
                      <input type="text" />
                    </div>
                  ))
                : null}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default App;
