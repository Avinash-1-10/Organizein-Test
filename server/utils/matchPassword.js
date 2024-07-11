import bcrypt from "bcryptjs";

export const matchPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};
