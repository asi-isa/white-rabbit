export function isPort(port: string): boolean {
  const portAsNum = parseInt(port);

  if (isNaN(portAsNum)) {
    return false;
  }

  return portAsNum > 1023 && portAsNum < 65535;
}
