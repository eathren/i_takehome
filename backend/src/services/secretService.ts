import { db } from "../db";
import { secrets, fragments } from "../db/schema";
import { splitSecret, joinSecret } from "../utils/secret";
import { nanoid } from "nanoid";
import bcrypt from "bcrypt";
import { NewFragment, Fragment, Secret, NewSecret } from "../db/types";

const SALT_ROUNDS = 10;

export async function storeSecret(
  secret: string,
  expireTimestamp: string,
  password?: string
) {
  const secretId = nanoid(8);
  const secretFragments = splitSecret(secret, 3);

  const expiresAt = new Date(expireTimestamp);

  let hashedPassword = null;
  if (password) {
    hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
  }

  await db
    .insert(secrets)
    .values([{ id: secretId, expiresAt, password: hashedPassword }]);

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

  const now = new Date();
  if (secretMeta.expiresAt <= now) throw new Error("Secret has expired");

  if (secretMeta.password) {
    const isPasswordValid = await bcrypt.compare(
      password ?? "",
      secretMeta.password
    );
    if (!isPasswordValid) throw new Error("Invalid password");
  }

  const secretParts: Fragment[] = await db.query.fragments.findMany({
    where: (f, { eq }) => eq(f.id, secretId),
    orderBy: (f, { asc }) => asc(f.order),
  });

  return joinSecret(secretParts);
}
