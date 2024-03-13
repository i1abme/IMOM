export const onlyKorean = (name: string) => {
  // travelerName 정규식 (한글만 가능)
  return name.replace(/[^a-zA-Zㄱ-ㅣ가-힣]/g, "");
};

export const onlyEnglish = (name: string) => {
  // enFirstName, enLastName 정규식 (영문만 가능)
  if (name && !/^[a-zA-Z]+$/.test(name)) {
    alert("영문으로 입력해주세요.");
  }
  return name.replace(/[^a-zA-Z]/g, "").toUpperCase();
};

export const phoneNumberFormat = (num: string) => {
  if (num && !/^[0-9-]*$/.test(num)) {
    alert("숫자로 입력해주세요.");
  }
  return num
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
    .replace(/(-{1,2})$/g, "");
};

export const birthFormat = (num: string): string => {
  if (num && !/^[0-9-]*$/.test(num)) {
    alert("숫자로 입력해주세요.");
  }
  if (num.length >= 11) {
    num = num.slice(0, 10);
  }
  return num
    .replace(/[^0-9]/g, "")
    .replace(/^(\d{0,4})(\d{0,2})(\d{0,2})$/g, "$1-$2-$3")
    .replace(/(-{1,2})$/g, "");
};

export const calculateAge = (
  birthDate: string,
  startDate: string
): "유아" | "아동" | "성인" => {
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

  if (age < 2) return "유아";
  if (age < 12) return "아동";
  return "성인";
};

export const checkValidDate = (dateOfBirth: string) => {
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/; //? YYYY-MM-DD 형식의 정규식
  const dateRegex4 = /^(19|20)\d{2}-(0[1-9]|1[0-2])-([0-2][1-9]|3[01])$/; //? 230613 kty YYYY-MM-DD 각 자리에 유효한 생년월일인지 확인

  if (dateRegex.test(dateOfBirth)) {
    if (dateRegex4.test(dateOfBirth)) return true;
    else return false;
  }
  return false;
};
