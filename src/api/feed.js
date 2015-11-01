
import { join } from 'path';
import { Router } from 'express';
import jade from 'jade';
import fm from 'front-matter';
import fs from '../utils/fs';
import request from 'superagent';
import Qs from 'qs';

const router = new Router();

const auth = () => {
  return new Promise((resolve, reject) => {
    const authUrl = "https://storia.me/api/acl/auth/Selfish/";
    const username = "test_task@example.com";
    const password = "qwe123";
    request.post(authUrl + username)
      .set('Content-Type', 'application/json')
      .send('{"password":"' + password + '", "remember":false, "token":""}')
      .end(function (err, res) {
        if (res.ok) {
          try {
            const authResp = JSON.parse(res.text);
            resolve(authResp.sessionId);
          } catch (e) {
            reject();
          }
        } else {
          reject();
        }
      });
  });
};

const loadContent = () => {
  return new Promise((resolve, reject) => {
    auth().then((sessionId) => {
      const contentUrl = "https://storia.me/api/feed/content";
      request.get(contentUrl)
        .set('Cookie', 'SSID='+sessionId)
        .end(function (err, res) {
          if (res.ok) {
            resolve(res.body.items || []);
          } else {
            //todo
          }
        });
    })
  });
}


const like = (storyId, momentId) => {
  return new Promise((resolve, reject) => {
    auth().then((sessionId) => {
      const likeUrl = "https://storia.me/api/core/stories/" + storyId +"/moments/" + momentId + "/like";
      request.post(likeUrl)
        .set('Cookie', 'SSID='+sessionId)
        .end(function (err, res) {
          if (res.ok) {
            resolve();
          }
        });
    })
  });
};

const unlike = (storyId, momentId) => {
  return new Promise((resolve, reject) => {
    auth().then((sessionId) => {
      const likeUrl = "https://storia.me/api/core/stories/" + storyId +"/moments/" + momentId + "/like";
      request.del(likeUrl)
        .set('Cookie', 'SSID='+sessionId)
        .end(function (err, res) {
          if (res.ok) {
            resolve();
          } else {
            reject();
          }
        });
    })
  });
};


router.get('/', async (req, res, next) => {
  try {

    const content = {
      path: '/',
      content: '',
      title: '',
      component: 'FeedPage'
    };
    const query = Qs.parse(req.query) || {};

    if (typeof(query.action) == 'undefined'){
      loadContent().then((items)=>{
        content.items = items;
        res.status(200).send(content);
      });

    } else if(query.action == "like"){
      like(query.storyId, query.momentId).then(() => {
        res.status(200).send({});
      })

    } else if(query.action == "unlike"){
      unlike(query.storyId, query.momentId).then(() => {
        res.status(200).send({});
      })
    }

  } catch (err) {
    next(err);
  }
});

export default router;

