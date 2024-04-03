export const calculateAge = (
  birthDate: string,
  startDate: string
): string[] => {
  const birth = new Date(birthDate);
  const departure = new Date(startDate);
  const diffYears = departure.getFullYear() - birth.getFullYear();
  const ageAdjustment =
    departure.getMonth() - birth.getMonth() < 0 ||
    (departure.getMonth() === birth.getMonth() &&
      departure.getDate() < birth.getDate())
      ? -1
      : 0;
  const age = diffYears + ageAdjustment;

  if (age < 2) return ["유아", "infant"];
  if (age < 12) return ["아동", "child"];
  return ["성인", "adult"];
};
