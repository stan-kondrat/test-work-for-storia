
import { join } from 'path';
import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import fs from '../utils/fs';

const router = new Router();

router.get('/', async (req, res, next) => {
  try {

    const content = {
      path: '/',
      content: '',
      title: '',
      component: 'FeedPage'
    };

    res.status(200).send(content);
  } catch (err) {
    next(err);
  }
});

export default router;

