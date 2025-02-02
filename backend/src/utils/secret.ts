export function splitSecret(secret: string, parts: number): string[] {
  const fragmentSize = Math.ceil(secret.length / parts);
  return Array.from({ length: parts }, (_, i) =>
    secret.slice(i * fragmentSize, (i + 1) * fragmentSize)
  );
}

export function joinSecret(fragments: { content: string }[]): string {
  return fragments
    .sort((a, b) => a.order - b.order)
    .map((f) => f.content)
    .join("");
}
