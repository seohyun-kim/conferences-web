# CELL Conference web 

> [!NOTE]  
> - "http://conference.selen.live/ " 여기로 접속할 수 있어요.  
> (단, 학교 서버에 배포했기 떄문에 교내에서만 접근이 가능합니다.)
> - 일단 기능적인 부분은 모두 완성 되었습니다! 모두 힘을 모아 등록해주세요🤗



## Preview
![conference selen live_ (2)](https://github.com/user-attachments/assets/839668ed-542c-4736-839c-7b21697b3a15)
![conference selen live_register%20conference html](https://github.com/user-attachments/assets/dba956f3-a42e-48a6-8cfc-5147b627d912)



## How to use
- 대시보드 페이지
  - 주요 시간 정보를 실시간으로 보여줍니다 (1초마다 업데이트 되어요!)
  - Full Paper Due를 기준으로 임박순 4개의 학회를 카드 형태로 보여줘요! (디데이 초단위로 나옵니다.)
  - 등록된 컨퍼런스 전체를 시간 임박 순으로 보여줍니다.
  - 이름을 클릭하면 홈페이지로 이동해요!
- 학회 등록하기
  - 학회 등록 페이지에서 정보를 입력하여 conference table에 등록할 수 있어요!
  - 타임 존 선택에 유의해주세요!
- 학회 정보 수정하기
  - Table 관리 페이지에서 수정 또는 삭제할 수 있습니다.
  - 단, Paper Due를 수정하고자 할 떄는 삭제 후 새로 등록해 주셔야 합니다!

## How to start
```
$ npm install 
$ npm start
```

## 서버 백그라운드 실행 (PM2)
```bash
$ pm2 start "npm run start" --name "conference"
```

```
[PM2] Starting /usr/bin/bash in fork_mode (1 instance)
[PM2] Done.
┌────┬───────────────┬─────────────┬─────────┬─────────┬──────────┬────────┬──────┬───────────┬──────────┬──────────┬──────────┬──────────┐
│ id │ name          │ namespace   │ version │ mode    │ pid      │ uptime │ ↺    │ status    │ cpu      │ mem      │ user     │ watching │
├────┼───────────────┼─────────────┼─────────┼─────────┼──────────┼────────┼──────┼───────────┼──────────┼──────────┼──────────┼──────────┤
│ 1  │ conference    │ default     │ N/A     │ fork    │ 95557    │ 0s     │ 0    │ online    │ 0%       │ 12.2mb   │ kkwon    │ disabled │
└────┴───────────────┴─────────────┴─────────┴─────────┴──────────┴────────┴──────┴───────────┴──────────┴──────────┴──────────┴──────────┘
[PM2][WARN] Current process list is not synchronized with saved list. Type 'pm2 save' to synchronize.
```
- PC 부팅 시 자동으로 실행되도록 설정 (PM2 startup)
  ```
  $ pm2 startup
  ```
  를 실행하면 
  ```
  [PM2] To setup the startup script, copy/paste the following command:
  sudo env PATH=$PATH:/home/user/.nvm/versions/node/v16.15.0/bin pm2 startup systemd -u user --hp /home/user
  ```
  이런 명령어가 표시될거고, 여기서 표시된 `sudo env ... pm2 startup systemd` 명령어를 그대로 실행
  ```
  $pm2 save
  ```
## Plan
Long term plan :
 - 웹페이지에서 자동 파싱, 자동 업데이트
 - 적당한 규격이 없다면.. 자연어 모델로..?
