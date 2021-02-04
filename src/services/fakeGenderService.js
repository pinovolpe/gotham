export const gender = [
  { _id: "5b21ca30eb7f6fbccd471818", name: "Uomini" },
  { _id: "5b21ca30eb7f6fbccd471820", name: "Donne" },
];

export function getGender() {
  return gender.filter((g) => g);
}
