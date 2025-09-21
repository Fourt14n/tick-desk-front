// Aqui eu queria um enum pras telas de listagem mas o enum do typescript
// Não consegue ser convertido em javascript, por isso ele dá erro
// Então eu vou usar essa abordagem que eu peguei na net
// Pra conseguir simular um enum de uma forma que o javascript consiga compilar
const EListagem = {
  Tickets: 0,
  Usuarios: 1,
} as const;

export type EListagem = typeof EListagem[keyof typeof EListagem];