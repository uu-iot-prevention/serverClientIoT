export const alerts = {
  SOS: "Bylo zmačknuto SOS tlačítko!",
  FIRE: "Spustil se poplach, Hoří v místnosti!",
  FIREWARNING: "Teplota se blíží k nebezpečné!",
};

export function convertDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  // Přidání nul před jednociferná čísla
  const formattedDay = day < 10 ? `0${day}` : day;
  const formattedMonth = month < 10 ? `0${month}` : month;

  // Vytvoření formátovaného řetězce s datem
  const formattedDate = `${formattedDay}.${formattedMonth}.${year}`;

  return formattedDate;
}
