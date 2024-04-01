#!/bin/sh

# DELETE 요청을 보내 컨퍼런스 정보 삭제
curl -X DELETE http://localhost:3000/api/conferences/1
