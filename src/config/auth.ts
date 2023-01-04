export default {
  jwt: {
    secret: "secretParaFazerTesteDeAutenticaçãoFuncionar",
    // secret: process.env.JWT_SECRET as string,
    expiresIn: '1d'
  }
}
