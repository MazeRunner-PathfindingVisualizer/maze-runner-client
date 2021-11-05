/* eslint-disable no-undef */
import { createById } from '../util/test';
import aStar from './aStar';
import bFS from './bFS';
import dFS from './dFS';
import dijkstra from './dijkstra';

describe('algorithms', () => {
  const START_NODE_ID = '9-0';
  const END_NODE_ID = '0-9';
  let byId;

  beforeEach(() => {
    byId = createById(START_NODE_ID, END_NODE_ID);
  });

  it('should be escape by a star search', () => {
    const result = aStar(byId, START_NODE_ID, END_NODE_ID);
    const answer = {
      message: 'success',
      animatedNodeIds: [
        '9-0',
        '9-1',
        '8-1',
        '8-2',
        '8-3',
        '7-3',
        '6-3',
        '6-2',
        '9-3',
        '9-4',
        '9-5',
        '8-5',
        '7-5',
        '7-6',
        '7-7',
        '7-8',
        '7-9',
        '6-9',
        '5-9',
        '4-9',
        '9-6',
        '4-8',
        '5-8',
        '8-8',
        '6-1',
        '5-7',
        '9-8',
        '9-9',
        '6-0',
        '5-0',
        '4-0',
        '4-1',
        '4-2',
        '3-2',
        '2-2',
        '1-2',
        '0-2',
        '2-3',
        '2-4',
        '1-4',
        '0-4',
        '0-5',
        '2-5',
        '2-6',
        '2-7',
        '1-7',
        '0-7',
        '0-8',
        '0-9',
      ],
    };

    expect(result).toEqual(answer);
  });

  it('should be escape by dijkstra', () => {
    const result = dijkstra(byId, START_NODE_ID, END_NODE_ID);
    const answer = {
      message: 'success',
      animatedNodeIds: [
        '9-0',
        '9-1',
        '8-1',
        '8-2',
        '8-3',
        '7-3',
        '9-3',
        '6-3',
        '9-4',
        '6-2',
        '9-5',
        '6-1',
        '8-5',
        '9-6',
        '6-0',
        '7-5',
        '5-0',
        '7-6',
        '4-0',
        '7-7',
        '4-1',
        '7-8',
        '4-2',
        '7-9',
        '8-8',
        '3-2',
        '6-9',
        '9-8',
        '2-2',
        '5-9',
        '9-9',
        '1-2',
        '2-3',
        '4-9',
        '5-8',
        '0-2',
        '2-4',
        '4-8',
        '5-7',
        '0-1',
        '1-4',
        '2-5',
        '5-6',
        '0-0',
        '0-4',
        '2-6',
        '5-5',
        '0-5',
        '1-0',
        '2-7',
        '5-4',
        '1-7',
        '2-0',
        '2-8',
        '4-4',
        '0-7',
        '2-9',
        '0-8',
        '0-9',
      ],
    };

    expect(result).toEqual(answer);
  });

  it('should be escape by bfs', () => {
    const result = bFS(byId, START_NODE_ID, END_NODE_ID);
    const answer = {
      message: 'success',
      animatedNodeIds: [
        '9-0',
        '9-1',
        '9-0',
        '8-1',
        '8-2',
        '8-3',
        '9-3',
        '7-3',
        '9-4',
        '6-3',
        '9-5',
        '6-2',
        '9-6',
        '8-5',
        '6-1',
        '7-5',
        '6-0',
        '7-6',
        '5-0',
        '7-7',
        '4-0',
        '7-8',
        '4-1',
        '8-8',
        '7-9',
        '4-2',
        '9-8',
        '6-9',
        '3-2',
        '9-9',
        '5-9',
        '2-2',
        '5-8',
        '4-9',
        '2-3',
        '1-2',
        '5-7',
        '4-8',
        '2-4',
        '0-2',
        '5-6',
        '2-5',
        '1-4',
        '0-1',
        '5-5',
        '2-6',
        '0-4',
        '0-0',
        '5-4',
        '2-7',
        '0-5',
        '1-0',
        '4-4',
        '2-8',
        '1-7',
        '2-0',
        '2-9',
        '0-7',
        '0-8',
        '0-9',
      ],
    };

    expect(result).toEqual(answer);
  });

  it('should be escape by dfs', () => {
    const result = dFS(byId, START_NODE_ID, END_NODE_ID);
    const answer = {
      message: 'success',
      animatedNodeIds: [
        '9-0',
        '9-1',
        '8-1',
        '8-2',
        '8-3',
        '7-3',
        '6-3',
        '6-2',
        '6-1',
        '6-0',
        '5-0',
        '4-0',
        '4-1',
        '4-2',
        '3-2',
        '2-2',
        '1-2',
        '0-2',
        '0-1',
        '0-0',
        '1-0',
        '2-0',
        '2-3',
        '2-4',
        '1-4',
        '0-4',
        '0-5',
        '2-5',
        '2-6',
        '2-7',
        '1-7',
        '0-7',
        '0-8',
        '0-9',
      ],
    };

    expect(result).toEqual(answer);
  });
});
