// Email regex validation
export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
// Password regex validation
export const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
//1.At least 8 characters.
//2.At least one letter and one number.
//3.(Optionally) At least one special character.
