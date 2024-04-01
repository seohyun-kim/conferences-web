import { Router } from 'express';
// CRUD 로직을 여기에 구현하고, 라우트에 연결합니다.

const router = Router();

// 예시: 모든 컨퍼런스 조회
router.get('/', async (req, res) => {
  // TypeORM을 사용해 데이터베이스에서 데이터 조회
});

export default router;
