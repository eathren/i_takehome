import express from "express";
import { storeSecret, retrieveSecret } from "../services/secretService";

const router = express.Router();

router.post("/share", async (req, res) => {
  try {
    const { content, expiresInMinutes, password } = req.body;
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + expiresInMinutes);

    const secretId = await storeSecret(content, expiresAt, password);
    res.json({ link: `http://localhost:5173/s/${secretId}` });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: (err as Error).message });
  }
});

router.get("/share/:id", async (req, res) => {
  try {
    const secret = await retrieveSecret(
      req.params.id,
      req.query.password as string
    );
    res.json({ content: secret });
  } catch (err) {
    res.status(404).json({ error: (err as Error).message });
  }
});

export default router;
