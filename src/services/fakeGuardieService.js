import * as sessoAPI from "./fakeGenderService";

const guardie = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    nomeGuardia: "Hank McCoy",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
    liked: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    nomeGuardia: "Earl Campbell",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    nomeGuardia: "Dwayne Williams",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    nomeGuardia: "Jean Bells",
    sesso: { _id: "5b21ca30eb7f6fbccd471820", name: "Donna" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    nomeGuardia: "Misty Hart",
    sesso: { _id: "5b21ca30eb7f6fbccd471820", name: "Donna" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    nomeGuardia: "Ray Lee",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    nomeGuardia: "Emily Kline",
    sesso: { _id: "5b21ca30eb7f6fbccd471820", name: "Donna" },
    liked: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    nomeGuardia: "Sean Coltrain",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    nomeGuardia: "Johnny Wade",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "1b21ca3eeb7f6fbccd471815",
    nomeGuardia: "Nelson Davis",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "2b21ca3eeb7f6fbccd471816",
    nomeGuardia: "Michael Pitts",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "3b21ca3eeb7f6fbccd471817",
    nomeGuardia: "Audrey West",
    sesso: { _id: "5b21ca30eb7f6fbccd471820", name: "Donna" },
  },
  {
    _id: "4b21ca3eeb7f6fbccd471819",
    nomeGuardia: "Gale Miller",
    sesso: { _id: "5b21ca30eb7f6fbccd471820", name: "Donna" },
  },
  {
    _id: "0b21ca3eeb7f6fbccd47181a",
    nomeGuardia: "Cole Hills",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "6b21ca3eeb7f6fbccd47181b",
    nomeGuardia: "Walter Travis",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "7b21ca3eeb7f6fbccd47181e",
    nomeGuardia: "Orville Lovett",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "8b21ca3eeb7f6fbccd47181f",
    nomeGuardia: "Conor Spencer",
    sesso: { _id: "5b21ca30eb7f6fbccd471818", name: "Uomo" },
  },
  {
    _id: "9b21ca3eeb7f6fbccd471821",
    nomeGuardia: "Sandra Dixon",
    sesso: { _id: "5b21ca30eb7f6fbccd471820", name: "Donna" },
  },
];

export function getGuardie() {
  return guardie;
}

export function getGuardia(id) {
  return guardie.find((m) => m._id === id);
}

export function saveGuardia(guardia) {
  let GuardiaInDb = guardie.find((m) => m._id === guardia._id) || {};
  GuardiaInDb.nomeGuardia = guardia.nomeGuardia;
  GuardiaInDb.sesso = sessoAPI.gender.find((g) => g._id === guardia.sessoId);

  if (!GuardiaInDb._id) {
    GuardiaInDb._id = Date.now().toString();
    guardie.push(GuardiaInDb);
  }

  return GuardiaInDb;
}

export function deleteGuardia(id) {
  let GuardiaInDb = guardie.find((m) => m._id === id);
  guardie.splice(guardie.indexOf(GuardiaInDb), 1);
  return GuardiaInDb;
}
