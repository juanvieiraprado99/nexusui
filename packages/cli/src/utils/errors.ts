export class ConfigError extends Error {
  readonly code = 'CONFIG_ERROR';
  constructor(message: string, public readonly suggestion?: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

export class RegistryError extends Error {
  readonly code = 'REGISTRY_ERROR';
  constructor(message: string, public readonly suggestion?: string) {
    super(message);
    this.name = 'RegistryError';
  }
}

export class FileSystemError extends Error {
  readonly code = 'FS_ERROR';
  constructor(message: string, public readonly suggestion?: string) {
    super(message);
    this.name = 'FileSystemError';
  }
}

export function formatError(err: unknown): string {
  if (err instanceof ConfigError || err instanceof RegistryError || err instanceof FileSystemError) {
    return err.suggestion ? `${err.message}\n  → ${err.suggestion}` : err.message;
  }
  return String(err);
}
