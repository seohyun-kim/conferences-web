#!/bin/sh

curl -X POST http://localhost:3000/api/conferences \
-H "Content-Type: application/json" \
-d '{
    "name": "MICRO 2024",
    "abstract_due": "2024-04-11T23:59:00.000-05:00",
    "full_paper_due": "2024-04-18T23:59:00.000-05:00",
    "location": "Austin, Texas, USA",
    "conference_start": "2024-11-02T00:00:00.000Z",
    "conference_end": "2024-11-06T23:59:00.000Z"
}'
