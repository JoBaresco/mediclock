export const isValidEmail = (email: string): boolean => {
  return /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/u.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 8 && digits.length <= 15;
};
