import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    userImage: { type: String, required: true },   // 사용자 프로필 이미지 URL
    nickname: { type: String, required: true },    // 사용자 닉네임
    content: { type: String, required: true },     // 댓글 내용
    postName: { type: String, required: true },    // 댓글이 달린 게시물 이름
  },
  { timestamps: true } // createdAt, updatedAt 자동 생성
);

export default mongoose.model("Comment", commentSchema);
