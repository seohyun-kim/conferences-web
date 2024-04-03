#!/bin/sh

# curl -X POST http://localhost:3000/api/conferences \
# -H "Content-Type: application/json" \
# -d '{
#     "name": "MICRO 2024",
#     "abstract_due": "2024-04-11T23:59:00.000-05:00",
#     "full_paper_due": "2024-04-18T23:59:00.000-05:00",
#     "location": "Austin, Texas, USA",
#     "conference_start": "2024-11-02T00:00:00.000Z",
#     "conference_end": "2024-11-06T23:59:00.000Z",
#     "url" : "https://microarch.org/micro57/"
# }'


# curl -X POST http://localhost:3000/api/conferences \
# -H "Content-Type: application/json" \
# -d '{
#     "name": "ICCAD 2024",
#     "abstract_due": "2024-04-11T23:59:00.000-05:00",
#     "full_paper_due": "2024-04-18T23:59:00.000-05:00",
#     "location": "Tokyo, Japan",
#     "conference_start": "2024-10-31T00:00:00.000Z",
#     "conference_end": "2024-10-31T23:59:00.000Z",
#     "url" : "https://2024.iccad.com/"
# }'

curl -X POST http://localhost:3000/api/conferences \
-H "Content-Type: application/json" \
-d '{
    "name": "HPCA 2025",
    "abstract_due": "2024-07-28T23:59:00.000-05:00",
    "full_paper_due": "2024-08-04T23:59:00.000-05:00",
    "location": "TBD",
    "conference_start": "2025-03-04T00:00:00.000Z",
    "conference_end": "2025-03-06T23:59:00.000Z",
    "url" : "https://hpca-conf.org/2025/"
}'


curl -X POST http://localhost:3000/api/conferences \
-H "Content-Type: application/json" \
-d '{
    "name": "ASPLOS 2025-FALL",
    "abstract_due": "2024-10-11T23:59:00.000-05:00",
    "full_paper_due": "2024-10-18T23:59:00.000-05:00",
    "location": "San Diego, USA ",
    "conference_start": "2025-04-27T00:00:00.000Z",
    "conference_end": "2025-05-01T23:59:00.000Z",
    "url" : "https://www.asplos-conference.org/"
}'
