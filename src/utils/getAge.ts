export const getAge = (start: string, birth: string) => {
  const startDate = new Date(start);
  const birthDate = new Date(birth);
  let age = startDate.getFullYear() - birthDate.getFullYear();
  const m = startDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && startDate.getDate() < birthDate.getDate())) {
    age--;
  }
};
