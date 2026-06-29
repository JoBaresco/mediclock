export const isValidEmail = (email: string): boolean => {
  return /^[\w.-]+@([\w-]+\.)+[\w-]{2,}$/u.test(email);
};
