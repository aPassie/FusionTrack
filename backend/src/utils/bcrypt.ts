import bcrypt from "bcrypt";

export const hashVal = async (value: string, saltRounds: number = 10) => {
    return await bcrypt.hash(value, saltRounds)
}

export const comparePass = async (value: string, hashedVal: string) => {
   return await bcrypt.compare(value, hashedVal)
}