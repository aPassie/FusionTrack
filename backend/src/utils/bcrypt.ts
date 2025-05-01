const bcrypt = require('bcrypt')

export const hashVal = async (value: string, saltRounds: number = 10) => {
    return await bcrypt.hash(value, saltRounds)
}

export const comparePass = async (value: string, hashedVal: string) => {
    await bcrypt.compare(value, hashedVal)
}