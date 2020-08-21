import React, { useState } from "react";
import DatePicker from "react-date-picker";
import "./App.css";

const App = () => {
  const [tournament, setTournament] = useState({
    tournamentName: "",
    startingDate: new Date(),
    endingDate: new Date(),
    numbTeams: 0
  });
  const [show, setShow] = useState(false);
  const [dateStart, setDateStart] = useState(false);
  const [dateEnd, setDateEnd] = useState(false);
  const [oddNumber, setOddNumber] = useState(false);

  const [numberTeams, setNumberTeams] = useState();
  const [grids, setGrids] = useState();
  const [grids1, setGrids1] = useState();
  const [grids2, setGrids2] = useState();
  const [grids3, setGrids3] = useState();
  const [grids4, setGrids4] = useState();
  const [grids5, setGrids5] = useState();

  const initialBracket = () => {
    const grid = loop(numberTeams / 2);
    setGrids(grid);
    const grid1 = loop(grid.length / 2);
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
    setShow(true);
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

  const HandleChangeTSDate = date => {
    if (Date.parse(date) < Date.now()) {
      setDateStart(true);
    } else {
      setDateStart(false);
    }
    setTournament({
      ...tournament,
      startingDate: date
    });
  };

  const HandleChangeTEDate = date => {
    if (
      tournament.startingDate &&
      Date.parse(date) < Date.parse(tournament.startingDate)
    ) {
      setDateEnd(true);
    } else {
      setDateEnd(false);
    }
    setTournament({
      ...tournament,
      endingDate: date
    });
  };

  const HandleChangeNumbTeams = event => {
    if (!isEven(event.target.value)) {
      setOddNumber(true);
    } else {
      setOddNumber(false);
    }
    setNumberTeams(event.target.value);
  };

  const isEven = value => {
    if (value % 2 === 0) return true;
    else return false;
  };

  /* TODO LIST:
  - User can enter the date for each match
  - User can enter the final score for each match
  - User can expect that this data will persist across sessions
  */

  return (
    <div className="App">
      <div className="container">
        <h1>Create Bracket Tournament</h1>
        {show ? null : (
          <section>
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
                <DatePicker
                  value={tournament.startingDate}
                  onChange={HandleChangeTSDate}
                />
                <DatePicker
                  value={tournament.endingDate}
                  onChange={HandleChangeTEDate}
                />
                <div className="error-message">
                  {dateStart ? (
                    <div className="text-danger">
                      The starting date cannot be before this day!
                    </div>
                  ) : null}
                  {dateEnd ? (
                    <div className="text-danger">
                      The Ending date cannot be before the starting date!
                    </div>
                  ) : null}
                </div>
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
                  value={numberTeams || 0}
                  onChange={HandleChangeNumbTeams}
                  className="form-control"
                  placeholder="Number-of-Teams"
                  aria-label="Number-of-Teams"
                  aria-describedby="basic-addon1"
                />
              </div>
              {oddNumber ? (
                <div className="text-danger">Number should be even!</div>
              ) : null}
            </div>
            {oddNumber || dateStart || dateEnd ? (
              <button
                className="btn btn-primary"
                disabled
                onClick={() => initialBracket()}
              >
                Generate
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => initialBracket()}
              >
                Generate
              </button>
            )}
          </section>
        )}

        {show ? (
          <section>
            <h1>Tournament : {tournament.tournamentName}</h1>
            <div className="tournament-date">
              {tournament.startingDate ? (
                <div className="date">
                  <h6 className="text-success">Start</h6>
                  <span className="btn btn-outline-success">
                    {tournament.startingDate.toLocaleDateString()}
                  </span>
                </div>
              ) : null}
              {tournament.endingDate ? (
                <div className="date">
                  <h6 className="text-danger">End</h6>
                  <span className="btn btn-outline-danger">
                    {tournament.endingDate.toLocaleDateString()}
                  </span>
                </div>
              ) : null}
            </div>
            <div className="general-bracket">
              {grids ? (
                <div className="bracket-initial">
                  {" "}
                  {grids.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Round 1</span>
                      <input type="text" placeholder="Team Name" />
                      <div className="date-picker">
                        <DatePicker
                          value={tournament.startingDate}
                          onChange={HandleChangeTSDate}
                        />
                      </div>
                      <input type="text" placeholder="Team Name" />
                    </div>
                  ))}{" "}
                </div>
              ) : null}
              {grids1 ? (
                <div className="bracket-initial">
                  {" "}
                  {grids1.map(grid => (
                    <div key={grid.grid} className="bracket b-2">
                      <span className="team-name">Round 2</span>
                      <input type="text" placeholder="Team Name" />

                      <input type="text" placeholder="Team Name" />
                    </div>
                  ))}{" "}
                </div>
              ) : null}
              {grids2 ? (
                <div className="bracket-initial">
                  {" "}
                  {grids2.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Round 3</span>
                      <input type="text" placeholder="Team Name" />

                      <input type="text" placeholder="Team Name" />
                    </div>
                  ))}{" "}
                </div>
              ) : null}
              {grids3 ? (
                <div className="bracket-initial">
                  {" "}
                  {grids3.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Round 4</span>
                      <input type="text" placeholder="Team Name" />

                      <input type="text" placeholder="Team Name" />
                    </div>
                  ))}{" "}
                </div>
              ) : null}
              {grids4 ? (
                <div className="bracket-initial">
                  {" "}
                  {grids4.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Round 5</span>
                      <input type="text" placeholder="Team Name" />

                      <input type="text" placeholder="Team Name" />
                    </div>
                  ))}{" "}
                </div>
              ) : null}
              {grids5 ? (
                <div className="bracket-initial">
                  {" "}
                  {grids5.map(grid => (
                    <div key={grid.grid} className="bracket">
                      <span className="team-name">Round 6</span>
                      <input type="text" placeholder="Team Name" />

                      <input type="text" placeholder="Team Name" />
                    </div>
                  ))}{" "}
                </div>
              ) : null}
            </div>
            <button className="btn btn-info" onClick={() => setShow(false)}>
              New
            </button>
          </section>
        ) : null}
      </div>
    </div>
  );
};

export default App;
