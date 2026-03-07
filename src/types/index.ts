// ── User 
export interface User {
    _id: string;
    id?: string;
    username: string;
    email?: string;
  }
  
  export interface SearchUser {
    _id: string;
    username: string;
  }
  
  // ── Posts / Files
  export interface Post {
    _id: string;
    username: string;
    subject: string;
    description: string;
    filePaths: string[];
    coverPhoto?: string;
    userId: { _id: string; username: string } | string;
    uploadedAt: string;
    upVotes?: number;
    downVotes?: number;
  }
  
  // ── Comments
  export interface Comment {
    _id: string;
    comment: string;
    username: string;
  }
  
  // ── Quizzes 
  export interface QuizQuestion {
    _id: string;
    question: string;
    options: { A: string; B: string; C: string; D: string };
    correctAnswer: string;
    score: number;
  }
  
  export interface Quiz {
    _id: string;
    title: string;
    username: string;
    creator: string;
    questions: QuizQuestion[];
    createdAt: Date;
  }
  
  // ── Bookmarks 
  export interface Bookmark {
    postId: Post | null;
    createdAt?: string;
  }
  
  // ── Notifications 
  export interface NotificationType {
    _id: string;
    userId: string;
    senderId: string;
    type: string;
    referenceId: string;
    message: string;
    isRead: boolean;
    createdAt: string;
  }