import type { Exercise } from '../types';

export const EXERCISES: Exercise[] = [
  {
    id: 'hand-stretch',
    name: '손 스트레칭',
    description: '자리에 앉은 채로 손과 손목을 풀어주는 동작',
    steps: [
      '양손을 앞으로 뻗고 손가락을 쫙 펼쳐요',
      '손목을 시계 방향으로 10초, 반대 방향으로 10초 돌려요',
      '주먹을 쥐었다 펴기를 10회 반복해요',
      '천천히 손가락 마디마디를 늘려줘요',
    ],
    durationSec: 60,
    tags: ['seated', 'low-impact'],
    unsuitableFor: [],
  },
  {
    id: 'breathing',
    name: '호흡법',
    description: '깊게 들이마시고 내쉬며 충동을 가라앉히는 호흡 운동',
    steps: [
      '편안하게 앉아 눈을 감아요',
      '4초간 코로 천천히 숨을 들이마셔요',
      '4초간 숨을 참아요',
      '6초간 입으로 천천히 내쉬어요',
      '이 호흡을 5회 반복해요',
    ],
    durationSec: 90,
    tags: ['seated', 'breathing', 'low-impact'],
    unsuitableFor: [],
  },
  {
    id: 'shoulder-roll',
    name: '어깨 돌리기',
    description: '어깨와 목 주변 긴장을 풀어주는 동작',
    steps: [
      '어깨를 귀 쪽으로 으쓱 올렸다가 힘을 빼며 내려요',
      '어깨를 앞에서 뒤로 크게 5회 돌려요',
      '반대 방향으로 5회 돌려요',
      '목을 좌우로 천천히 기울여줘요',
    ],
    durationSec: 60,
    tags: ['seated', 'low-impact'],
    unsuitableFor: [],
  },
  {
    id: 'walk-in-place',
    name: '제자리 걷기',
    description: '가볍게 제자리에서 걸으며 몸을 움직이는 동작',
    steps: [
      '편한 자세로 일어서요',
      '제자리에서 무릎을 살짝 들며 30초간 걸어요',
      '팔도 자연스럽게 흔들어줘요',
      '속도를 천천히 줄이며 마무리해요',
    ],
    durationSec: 90,
    tags: ['standing'],
    unsuitableFor: ['무릎', '허리'],
  },
  {
    id: 'neck-stretch',
    name: '목 스트레칭',
    description: '목과 어깨 주변을 천천히 늘려주는 동작',
    steps: [
      '고개를 오른쪽으로 천천히 기울여 10초 유지해요',
      '고개를 왼쪽으로 천천히 기울여 10초 유지해요',
      '고개를 아래로 숙여 목 뒤를 늘려요',
      '천천히 고개를 원위치로 돌려요',
    ],
    durationSec: 60,
    tags: ['seated', 'low-impact'],
    unsuitableFor: [],
  },
  {
    id: 'squat-light',
    name: '가벼운 스쿼트',
    description: '허벅지와 하체 근육을 가볍게 사용하는 동작',
    steps: [
      '어깨너비로 서서 허리를 곧게 펴요',
      '무릎을 살짝 굽히며 앉는 자세를 취해요',
      '천천히 다시 일어서요',
      '이 동작을 8회 반복해요',
    ],
    durationSec: 90,
    tags: ['standing'],
    unsuitableFor: ['무릎', '허리'],
  },
];

export function getExerciseById(id: string): Exercise | undefined {
  return EXERCISES.find((e) => e.id === id);
}
