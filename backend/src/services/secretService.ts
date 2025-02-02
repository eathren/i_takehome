import { db } from "../db";
import { secrets, fragments } from "../db/schema";
import { splitSecret, joinSecret } from "../utils/secret";
import { nanoid } from "nanoid";
import { NewFragment, Fragment, Secret, NewSecret } from "../db/types";

export async function storeSecret(
  secret: string,
  expiresAt: Date,
  password?: string
) {
  const secretId = nanoid(8);
  const secretFragments = splitSecret(secret, 3);

  await db
    .insert(secrets)
    .values([{ id: secretId, expiresAt, password: password ?? null }]);

  await Promise.all(
    secretFragments.map((fragment, i) =>
      db
        .insert(fragments)
        .values([{ id: secretId, order: i, content: fragment }])
    )
  );

  return secretId;
}

export async function retrieveSecret(
  secretId: string,
  password?: string
): Promise<string> {
  const secretMeta: Secret | undefined = await db.query.secrets.findFirst({
    where: (s, { eq }) => eq(s.id, secretId),
  });

  if (!secretMeta) throw new Error("Secret not found");
  if (secretMeta.password && secretMeta.password !== password)
    throw new Error("Invalid password");

  const secretParts: Fragment[] = await db.query.fragments.findMany({
    where: (f, { eq }) => eq(f.id, secretId),
    orderBy: (f, { asc }) => asc(f.order),
  });

  return joinSecret(secretParts);
}
