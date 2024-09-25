export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '485722880362032',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '3e2e20e08c7378344c0c15fbca8a16c8',
  },
  s3: {
    accessKey: process.env.ASW_S3_ACCESS_KEY ?? 'AKIAQ4J5YGGFG63QEJQX',
    secret: process.env.ASW_S3_SECRET ?? '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',
    bucket: process.env.ASW_S3_BUCKET ?? 'testecursonode'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'chavesecreta'
}
