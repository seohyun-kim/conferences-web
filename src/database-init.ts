import "reflect-metadata"; // TypeORM에서 필수
import { AppDataSource } from "./data-source"; // 데이터 소스 임포트

async function initializeDatabase() {
  const isDevMode = process.env.NODE_ENV === "development"; // 개발 환경 체크

//   if (!isDevMode) {
//     console.log("비개발 모드에서는 데이터베이스 초기화를 건너뜁니다.");
//     return; // 비개발 모드에서 초기화 건너뛰기
//   }

  try {
    await AppDataSource.initialize(); // 데이터베이스 연결 초기화
    console.log("데이터 소스가 초기화되었습니다!");

    // 기존 데이터베이스 삭제
    await AppDataSource.dropDatabase();
    console.log("데이터베이스가 삭제되었습니다!");

    // 데이터베이스 스키마 동기화
    await AppDataSource.synchronize();
    console.log("데이터베이스가 동기화되었습니다!");
  } catch (error) {
    console.error("데이터베이스 초기화 중 오류 발생:", error);
  } finally {
    // 연결 종료
    await AppDataSource.destroy();
  }
}

initializeDatabase();
