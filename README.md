# 👟 Maze Runner

미로를 만들고 다양한 알고리즘을 이용해 탈출해보세요!

![구동장면](./readme-asset/mazerunner.gif)

<br>

## 목차

1. [Motivation](#motivation)
2. [Tech Stack](#tech-stack)
3. [Task Tool](#task-tool)
4. [Schedule](#schedule)
5. [Convention](#convention)
6. [Features](#features)
7. [Algorithms](#algorithms)
8. [UI example](#ui-example)
9. [Demo](#demo)
10. [Installation](#installation)
11. [Motivation](#usage)

<br>
<br>
<br>

## Motivation

알고리즘을 처음 접할 때 이해하기 어려운 경우가 종종 있습니다. 하지만 이런 말이 있죠.

**"백문이 불여일견"**

두 눈으로 알고리즘을 직접보면 더 쉽게 알고리즘을 학습할 수 있습니다.

Maze Runner에서 효율적으로 학습 해보세요! A \* search / Dijkstra / DFS / BFS 알고리즘을 눈으로 즐길 수 있습니다.

<br>

## Tech Stack

React / Redux / PostCSS / MongoDB Atlas / Express / Jest

- Front
  React / Redux / PostCSS

- Why use **React**

  Maze runner의 미로는 수십에서 수백개의 Node로 이루어져있습니다. 그리고 각 Node들은 특정한 상태를 갖게됩니다.

<br>

## Task Tool

- Mockup: https://www.figma.com/file/WeZ2ZDddDEtHXWKVJIiLDz/Maze-runner?node-id=0%3A1
- Kanban: https://github.com/orgs/MazeRunner-PathfindingVisualizer/projects/1

<br>

## Schedule

총 개발 기간: 2021/09/27 ~ 2021/10/19

1주차:

- Mockup
- Kanban
- Spec check
- Directory Settings

2주차:

- Apis
  - GET /maze/:mazeId
  - POST /maze
- UI layout
  - Nav bar
  - Mobile nav bar
- 미로 에디터
- 길 찾기 알고리즘 - DFS / BFS / Dijkstra / A star search
- 길 찾기 기능
- 길 찾기 속도 조절 기능

3주차:

- 경유 기능
- 가중치 블록 생성 기능
- 미로 지우기 기능
- 미로 만들기 알고리즘 - Algorithm Recursive-division
- 저장 & 공유 기능
- 모바일 이벤트 대응
- Netlify / AWS 배포
- 테스트코드

<br>

## Convention

- Coding convetions: [React-recommend](https://github.com/yannickcr/eslint-plugin-react)
- [Commit message](https://github.com/helderburato/dotfiles/blob/main/git/.gittemplates/commit)
- CSS 선언 순서: [NHN coding convention - 63page 5.8.1 속성선언순서](https://nuli.navercorp.com/data/convention/NHN_Coding_Conventions_for_Markup_Languages.pdf)
- Branch 전략: Git-flow
- Merge 전략: Merge (create merge commit)

## Features

- 미로 에디터
  - mouse event 및 touch event 를 각각 구현하여 desktop / moblile 에서 동작가능.
- 미로 길 찾기 - A star search / Dijkstra / DFS / BFS
  - Animation Queue에 방문한 Node를 저장한 후 하나 씩 Node의 상태를 바꾸어 구현함.
  - Animation 속도를 조절하기 위해 setTimeout에 delay를 줌.
  - Animation 정지 기능을 위해 항상 최신의 timeout id를 기억하고 이를 이용해 clearTimeout하여 구현함.
- 경유 기능
- 미로 자동 생성 - recursive division / basic random
  - 미로 생성 알고리즘을 이용하여 미로를 자동생성함.
- 저장 및 공유
  - 미로를 구성하는 Node의 상태를 0~5의 숫자로 변환하여 서버에 저장함으로써 서버에 저장되는 데이터의 양을 줄임.

## Algorithms

- 가중치를 적용할 수 없는 알고리즘

  - DFS (Depth First Search)
    깊이를 우선적으로 탐색하는 알고리즘

  https://user-images.githubusercontent.com/26831729/140452059-f339b0fb-af53-4360-8930-e5a2ff57df2a.mp4

  - BFS (Breadth First Search)
    너비를 우선적으로 탐색하는 알고리즘

  https://user-images.githubusercontent.com/26831729/140463191-7a6969dc-aba9-41ee-899f-497e500340ad.mp4

- 가중치를 적용할 수 있는 알고리즘

  - Dijkstra
    한 점으로부터 다른 모든 점들까지의 최단거리를 찾는 알고리즘

  https://user-images.githubusercontent.com/26831729/140464170-7a03285d-32c4-47f0-8beb-b2a7d8816e82.mp4

  - A star search
    Dijkstra에서 hn(휴리스틱)을 추가한 알고리즘
    A* 알고리즘 평가 함수: fn = gn + hn
    fDistance = gDistance + hDistance
    gn: 출발에서 지금(n) 까지의 경로 가중치
    hn: 지금(n) 부터 목표까지의 경로 가중치 - (n ~ 목표 거리(manhattan 거리) 계산)
    https://ko.wikipedia.org/wiki/A*\_%EC%95%8C%EA%B3%A0%EB%A6%AC%EC%A6%98

  https://user-images.githubusercontent.com/26831729/140465114-1805e763-6d08-4b26-874d-19386be396a2.mp4

## UI example

- 미로 그리기
  https://user-images.githubusercontent.com/26831729/140500195-9599d1f0-a9f9-415b-b99d-56a9a52d6d0c.mp4

- 경유지 설정
  https://user-images.githubusercontent.com/26831729/140500901-8b0b18e3-6b9f-4169-b0f0-dd6f7322c000.mp4

- 미로 공유

## Log

1.
2.
