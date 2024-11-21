import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Conference } from '../entity/Conference';
const { DateTime } = require('luxon');

const router = Router();


function convertToTimezone(datetime: any, timezone: any) {
  // 입력된 날짜(datetime)를 주어진 타임존(timezone) 기준으로 파싱
  const convertedDate = DateTime.fromISO(datetime, { zone: timezone });

  // 주어진 타임존을 기준으로 파싱된 시간을 UTC로 변환
  const utcDate = convertedDate.toUTC();

  console.log("변환된 시간 (UTC) : ", utcDate.toString());
  return utcDate.toISO();  // UTC로 변환된 ISO 문자열 반환
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


// GET - 모든 학회 정보 조회
router.get('/', async (req, res) => {
  try {
    const conferenceRepository = getRepository(Conference);
    const conferences = await conferenceRepository.createQueryBuilder("conference")
      .orderBy("conference.full_paper_due", "ASC") // full_paper_due를 기준으로 정렬
      .getMany();

    // 학회 정보 반환 (변환된 시간 포함)
    res.status(200).json(conferences);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});




// GET - 특정 학회 정보 조회
router.get('/:id', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
    const conference = await conferenceRepository.findOneOrFail({
      where: { id: parseInt(req.params.id) }
    });

    // 클라이언트가 요청한 타임존을 가져옵니다. (예: 'Asia/Seoul' 등)
    const clientTimezone = req.query.timezone || 'Asia/Seoul'; // 기본값은 KST

    // 시간 변환
    const conferenceWithConvertedDates = {
      ...conference,
      abstract_due: conference.abstract_due ? DateTime.fromISO(conference.abstract_due).setZone(clientTimezone).toISO() : null,
      full_paper_due: conference.full_paper_due ? DateTime.fromISO(conference.full_paper_due).setZone(clientTimezone).toISO() : null,
      conference_start: conference.conference_start ? DateTime.fromJSDate(conference.conference_start).setZone(clientTimezone).toISO() : null,
      conference_end: conference.conference_end ? DateTime.fromJSDate(conference.conference_end).setZone(clientTimezone).toISO() : null,
    };

    res.json(conferenceWithConvertedDates);
  } catch (error) {
    res.status(404).json({ message: 'Conference not found' });
  }
});


// PUT - 학회 정보 수정
router.put('/:id', async (req, res) => {
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
