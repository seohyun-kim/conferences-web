import { Router } from 'express';
import { Repository, getRepository } from 'typeorm';
import { Conference } from '../entity/Conference';
const { DateTime } = require('luxon');

const router = Router();


export function convertToTimezone(datetime: string, timezone: string): string {
  // Luxon에서 ISO 8601 형식으로 날짜를 변환
  const localDate = DateTime.fromISO(datetime, { zone: timezone });

  // 유효하지 않은 datetime이나 timezone에 대해 예외를 던짐
  if (!localDate.isValid) {
    throw new Error(`Invalid datetime or timezone: ${datetime}, ${timezone}`);
  }

  // 유효한 경우 UTC로 변환 후 ISO 포맷으로 반환
  return localDate.toUTC().toISO();
}


// 공통 함수: 특정 ID에 해당하는 데이터 또는 모든 데이터 가져오기
async function fetchConferences(conferenceRepository: Repository<Conference>, id: number | null = null) {
  const queryBuilder = conferenceRepository.createQueryBuilder("conference");

  if (id) {
    queryBuilder.where("conference.id = :id", { id });
  }

  queryBuilder.orderBy("conference.full_paper_due", "ASC");

  try {
    const result = id ? await queryBuilder.getOne() : await queryBuilder.getMany();

    // 로그 출력: 가져온 데이터 확인
    console.log(
      id 
        ? `Fetched conference with ID ${id}:` 
        : "Fetched all conferences:",
      result
    );

    return result;
  } catch (error) {
    console.error("Error fetching conferences:", error);
    throw error;
  }
}



router.post('/', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  console.log(req.body);

  const { category, conference_start, conference_end, abstract_due, full_paper_due, abstract_timezone, full_paper_timezone, ...otherFields } = req.body;

  // category는 문자열로 저장될 수 있으므로, 배열로 변환
  const parsedCategories = JSON.parse(category);

  // 날짜 변환 (타임존 변환 후 UTC로 변환)
  const abstractDueUTC = convertToTimezone(abstract_due, abstract_timezone); 
  const fullPaperDueUTC = convertToTimezone(full_paper_due, full_paper_timezone); 

  // UTC로 변환된 ISO 형식으로 저장
  const abstractDueUTCISO = new Date(abstractDueUTC).toISOString(); // UTC로 변환하고 ISO 형식으로 저장
  const fullPaperDueUTCISO = new Date(fullPaperDueUTC).toISOString(); // 동일하게 full_paper_due도 처리

  // 새로 생성할 학회 객체
  const newConference = conferenceRepository.create({
    ...otherFields,
    category: parsedCategories, // 배열로 변환된 category 저장
    abstract_due: abstractDueUTCISO, // UTC 기준으로 저장
    full_paper_due: fullPaperDueUTCISO, // UTC 기준으로 저장
    conference_start: conference_start ? new Date(conference_start).toISOString() : null,
    conference_end: conference_end ? new Date(conference_end).toISOString() : null,
  });

  try {
    const result = await conferenceRepository.save(newConference);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});


// GET / - 모든 학회 정보 조회
router.get('/', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
    const conferences = await fetchConferences(conferenceRepository);

    res.status(200).json(conferences);
    // console.log(req.body)
  } catch (error) {
    console.error("Error fetching conferences: ", error);
    res.status(500).json({ message: "Internal server error" });
  }

});



// GET /:id - 특정 학회 정보 조회
router.get('/:id', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid conference ID" });
    }

    const conference = await fetchConferences(conferenceRepository, id);

    if (!conference) {
      return res.status(404).json({ message: "Conference not found" });
    }

    console.log(req.body)

    res.status(200).json(conference);
  } catch (error) {
    console.error("Error fetching conference by ID: ", error);
    res.status(500).json({ message: "Internal server error" });
  }
});



// PUT - 학회 정보 수정
router.put('/:id', async (req, res) => {
  console.log("Request Params: ", req.params);
  console.log("/:id put")
  console.log(req.body)

  const conferenceRepository = getRepository(Conference);
  try {
    const conference = await conferenceRepository.findOneOrFail({
      where: { id: parseInt(req.params.id) },
    });

    // category가 배열로 저장되어 있을 경우 그대로 처리
    if (req.body.category) {
      req.body.category = req.body.category; // 배열 그대로 저장
    }

    // 날짜 변환 (타임존 변환)
    if (req.body.abstract_due) {
      req.body.abstract_due = convertToTimezone(req.body.abstract_due, req.body.abstract_timezone);
    }
    if (req.body.full_paper_due) {
      req.body.full_paper_due = convertToTimezone(req.body.full_paper_due, req.body.full_paper_timezone);
    }

    // 기존 conference 객체에 새로운 값 병합
    conferenceRepository.merge(conference, req.body);

    const results = await conferenceRepository.save(conference);
    res.json(results);
  } catch (error) {
    res.status(404).json({ message: 'Conference not found' });
  }
});

// DELETE - 학회 정보 삭제
router.delete('/:id', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
      const result = await conferenceRepository.delete(req.params.id);
      if (result.affected === 0) {
          throw new Error('No rows affected');
      }
      res.status(204).send();
  } catch (error) {
      res.status(404).json({ message: 'Conference not found' });
  }
});

export default router;
