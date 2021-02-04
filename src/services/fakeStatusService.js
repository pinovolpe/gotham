export const status = [
  { _id: "5b21ca3eeb7f6fbccd471818", name: "Evasi" },
  { _id: "5b21ca3eeb7f6fbccd471814", name: "In detenzione" },
  { _id: "5b21ca3eeb7f6fbccd471820", name: "Deceduti" },
];

export function getStatus() {
  return status.filter((g) => g);
}
