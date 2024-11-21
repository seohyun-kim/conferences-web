import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Conference } from '../entity/Conference';

const router = Router();

router.post('/', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  const { category, conference_start, conference_end, ...otherFields } = req.body;

  // 새로운 conference 객체 생성
  const newConference = conferenceRepository.create({
    ...otherFields,
    category, // 이미 배열로 처리된 category
    conference_start: new Date(conference_start),
    conference_end: new Date(conference_end),
  });

  try {
    const result = await conferenceRepository.save(newConference);
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
});


router.get('/', async (req, res) => {
  try {
    const conferenceRepository = getRepository(Conference);
    const conferences = await conferenceRepository.createQueryBuilder("conference")
      .orderBy("conference.full_paper_due", "ASC") // ASC 또는 DESC로 정렬
      .getMany();

    // 여기서 category는 이미 배열로 반환됨
    res.status(200).json(conferences);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});



router.get('/:id', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
      const conference = await conferenceRepository.findOneOrFail({
        where: { id: parseInt(req.params.id) }
      });

      // 'category'는 이미 배열로 저장되어 있으므로 변환할 필요가 없습니다.
      res.json(conference);
  } catch (error) {
      res.status(404).json({ message: 'Conference not found' });
  }
});


router.put('/:id', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
    const conference = await conferenceRepository.findOneOrFail({
      where: { id: parseInt(req.params.id) },
    });

    // category가 배열인 경우 그대로 처리
    if (req.body.category) {
      req.body.category = req.body.category; // 배열 그대로 저장
    }

    conferenceRepository.merge(conference, req.body);
    const results = await conferenceRepository.save(conference);
    res.json(results);
  } catch (error) {
    res.status(404).json({ message: 'Conference not found' });
  }
});


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
