export function checkGuess(guess, driverA, driverB) {
  const tatsaechlich = driverB.points > driverA.points ? "mehr" : "weniger";
  return guess === tatsaechlich;
}

export function pickTwoDrivers(drivers) {
  if (drivers.length < 2) return null;
  let a, b;
  let versuche = 0;
  do {
    a = drivers[Math.floor(Math.random() * drivers.length)];
    b = drivers[Math.floor(Math.random() * drivers.length)];
    versuche++;
  } while ((a.id === b.id || a.points === b.points) && versuche < 50);
  return { driverA: a, driverB: b };
}

export function validateDriver(driver) {
  const errors = {};
  if (!driver.name || driver.name.trim() === "") {
    errors.name = "Name ist ein Pflichtfeld";
  }
  if (!driver.team || driver.team.trim() === "") {
    errors.team = "Team ist ein Pflichtfeld";
  }
  if (driver.points === "" || Number(driver.points) < 0) {
    errors.points = "Punkte müssen 0 oder grösser sein";
  }
  return errors;
}
