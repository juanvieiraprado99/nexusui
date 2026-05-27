// Barrel intencionalmente parcial. nexus-ui segue o modelo de cópia (shadcn-style):
// componentes são copiados para o projeto do usuário pelo CLI (@nexuslabs/cli), não
// importados deste pacote. Internamente, os apps do monorepo consomem componentes via
// deep paths `@nexus/*`. Aqui exportamos apenas utils + services, que são as únicas
// peças importadas do pacote `nexus` (ex.: DarkModeService).
export * from './lib/shared/utils';
export * from './lib/shared/services';
