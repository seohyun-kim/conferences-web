import { Router } from 'express';
import { getRepository } from 'typeorm';
import { Conference } from '../entity/Conference';

const router = Router();


router.post('/', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  const { conference_start, conference_end, ...otherFields } = req.body;
  const newConference = conferenceRepository.create({
      ...otherFields,
      conference_start: new Date(conference_start),
      conference_end: new Date(conference_end)
  });

  try {
      const result = await conferenceRepository.save(newConference);
      res.status(201).json(result);
  } catch (error) {
      res.status(400).json({ message: (error as Error).message });
  }
});

router.get('/', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  const conferences = await conferenceRepository.find();
  res.json(conferences);
});

router.get('/:id', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
      const conference = await conferenceRepository.findOneOrFail({
        where: { id: parseInt(req.params.id) }
      });
      res.json(conference);
  } catch (error) {
      res.status(404).json({ message: 'Conference not found' });
  }
});


router.put('/:id', async (req, res) => {
  const conferenceRepository = getRepository(Conference);
  try {
      const conference = await conferenceRepository.findOneOrFail({
        where: { id: parseInt(req.params.id) }
      });
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
