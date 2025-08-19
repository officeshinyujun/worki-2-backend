import express from "express";
import Comment from "../models/Comment.js";

const router = express.Router();


/**
 * @route   POST /api/comments
 * @desc    댓글 작성
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
 * @route   GET /api/comments/:postName
 * @desc    특정 게시물의 댓글 불러오기
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
