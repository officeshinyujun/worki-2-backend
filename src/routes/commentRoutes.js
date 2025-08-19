import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();


/**
 * @swagger
 * /api/comments:
 *   post:
 *     summary: Create a new comment
 *     tags: [Comments]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Comment'
 *     responses:
 *       201:
 *         description: The created comment
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Missing required fields
 *       500:
 *         description: Server error
 */
router.post("/", async (req, res) => {
  try {
    const { userImage, nickname, content, postName } = req.body;

    if (!userImage || !nickname || !content || !postName) {
      return res.status(400).json({ error: "모든 필드를 입력해야 합니다." });
    }

    const newComment = new Comment({ userImage, nickname, content, postName });
    await newComment.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: "댓글 저장 실패", details: err.message });
  }
});

/**
 * @swagger
 * /api/comments/{postName}:
 *   get:
 *     summary: Get all comments for a specific post
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: postName
 *         required: true
 *         schema:
 *           type: string
 *         description: The post identifier
 *     responses:
 *       200:
 *         description: List of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comment'
 *       500:
 *         description: Server error
 */
router.get("/:postName", async (req, res) => {
  try {
    const comments = await Comment.find({ postName: req.params.postName }).sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: "댓글 불러오기 실패", details: err.message });
  }
});



export default router;
