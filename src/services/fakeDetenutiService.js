import * as statusAPI from "./fakeStatusService";

const detenuti = [
  {
    _id: "5b21ca3eeb7f6fbccd471815",
    nomeDetenuto: "Joker",
    crimine: "Psicopatico",
    stato: { _id: "5b21ca3eeb7f6fbccd471818", name: "Evaso" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "Mai",
    liked: true,
  },
  {
    _id: "5b21ca3eeb7f6fbccd471816",
    nomeDetenuto: "Due Facce",
    crimine: "Omicidio",
    stato: { _id: "5b21ca3eeb7f6fbccd471820", name: "Deceduto" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "01/02/2041",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471817",
    nomeDetenuto: "Catwoman",
    crimine: "Furto",
    stato: { _id: "5b21ca3eeb7f6fbccd471818", name: "Evaso" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "01/02/2026",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471819",
    nomeDetenuto: "Bane",
    crimine: "Cospirazione",
    stato: { _id: "5b21ca3eeb7f6fbccd471820", name: "Deceduto" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "Mai",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181a",
    nomeDetenuto: "Pinguino",
    crimine: "Mafia",
    stato: { _id: "5b21ca3eeb7f6fbccd471814", name: "In detenzione" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "01/02/2051",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181b",
    nomeDetenuto: "Enigmista",
    crimine: "Truffa",
    stato: { _id: "5b21ca3eeb7f6fbccd471814", name: "In detenzione" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "01/02/2031",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181e",
    nomeDetenuto: "Poison Ivy",
    crimine: "Eco-terrorismo",
    stato: { _id: "5b21ca3eeb7f6fbccd471814", name: "In detenzione" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "01/02/2046",
  },
  {
    _id: "5b21ca3eeb7f6fbccd47181f",
    nomeDetenuto: "Harley Quinn",
    crimine: "Psicopatica",
    stato: { _id: "5b21ca3eeb7f6fbccd471818", name: "Evaso" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "Mai",
  },
  {
    _id: "5b21ca3eeb7f6fbccd471821",
    nomeDetenuto: "Mr. Freeze",
    crimine: "Rapina",
    stato: { _id: "5b21ca3eeb7f6fbccd471814", name: "In detenzione" },
    dataCarcerazione: "01/02/2021",
    dataScarcerazione: "01/02/2036",
  },
];

export function getDetenuti() {
  return detenuti;
}

export function getDetenuto(id) {
  return detenuti.find((m) => m._id === id);
}

export function saveDetenuto(detenuto) {
  let DetenutoInDb = detenuti.find((m) => m._id === detenuto._id) || {};
  DetenutoInDb.nomeDetenuto = detenuto.nomeDetenuto;
  DetenutoInDb.crimine = detenuto.crimine;
  DetenutoInDb.stato = statusAPI.status.find((g) => g._id === detenuto.statoId);
  DetenutoInDb.dataCarcerazione = detenuto.dataCarcerazione;
  DetenutoInDb.dataScarcerazione = detenuto.dataScarcerazione;

  if (!DetenutoInDb._id) {
    DetenutoInDb._id = Date.now().toString();
    detenuti.push(DetenutoInDb);
  }

  return DetenutoInDb;
}

export function deleteDetenuto(id) {
  let DetenutoInDb = detenuti.find((m) => m._id === id);
  detenuti.splice(detenuti.indexOf(DetenutoInDb), 1);
  return DetenutoInDb;
}
