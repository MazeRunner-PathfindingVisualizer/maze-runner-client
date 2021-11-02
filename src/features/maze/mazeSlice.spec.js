/* eslint-disable no-undef */
import { NODE_STATUS } from '../../constant';
import mazeReducer, {
  createMaze,
  mouseDown,
  mouseUp,
  clickFeatNode,
  changeNormalNode,
  changeFeatNode,
  startPathfinding,
  visitNode,
  drawMazeNode,
  markPathNode,
  setAnimationTimeoutId,
  startAnimation,
  endAnimation,
  clearVisitedAndPathNodes,
  clearWallAndWeightNode,
  changeCurrentJamBlockType,
  createMiddleNode,
  deleteMiddleNode,
  drawRecursiveDivisionMaze,
  drawBasicRandomWall,
} from './mazeSlice';

describe('maze reducer basic', () => {
  const initialState = {
    width: 0,
    height: 0,
    widthCount: 0,
    heightCount: 0,

    startNodeId: null,
    endNodeId: null,
    middleNodeId: null,

    nodes: {
      byId: {},
      allIds: [[]],
    },
    animatedNodeIds: [],
    animatedPathNodeIds: [],
    animatedMazeNodeIds: [],
    animationTimeoutId: null,

    isVisitNodeColorChanged: false,
    isPathNodeColorChanged: false,

    isMouseDown: false,
    isFeatNodeClick: false,
    clickedFeatNodeInfo: {
      id: null,
      status: null,
    },

    isProgressive: false,

    currentJamBlockType: NODE_STATUS.WALL,

    weightValue: 10,

    isErrorOccurred: false,
    error: null,

    mazeId: null,
  };

  it('should handle initial state', () => {
    expect(mazeReducer(undefined, { type: 'unknown' })).toEqual({
      width: 0,
      height: 0,
      widthCount: 0,
      heightCount: 0,

      startNodeId: null,
      endNodeId: null,
      middleNodeId: null,

      nodes: {
        byId: {},
        allIds: [[]],
      },
      animatedNodeIds: [],
      animatedPathNodeIds: [],
      animatedMazeNodeIds: [],
      animationTimeoutId: null,

      isVisitNodeColorChanged: false,
      isPathNodeColorChanged: false,

      isMouseDown: false,
      isFeatNodeClick: false,
      clickedFeatNodeInfo: {
        id: null,
        status: null,
      },

      isProgressive: false,

      currentJamBlockType: NODE_STATUS.WALL,

      weightValue: 10,

      isErrorOccurred: false,
      error: null,

      mazeId: null,
    });
  });

  it('should handle createMaze', () => {
    const actual = mazeReducer(
      initialState,
      createMaze({ width: 800, height: 600 }),
    );
    expect(actual.widthCount).toEqual(20);
    expect(actual.heightCount).toEqual(7);
    expect(actual.startNodeId).toEqual('3-5');
    expect(actual.endNodeId).toEqual('3-15');
  });
});

describe('maze reducer', () => {
  let testMazeState;

  beforeEach(() => {
    testMazeState = mazeReducer(
      undefined,
      createMaze({ width: 800, height: 600 }),
    );
    console.log(testMazeState.widthCount);
  });

  it('should handle mouseDown', () => {
    const actual = mazeReducer(testMazeState, mouseDown());
    expect(actual.isMouseDown).toEqual(true);
  });

  it('should handle mouseUp', () => {
    const actual = mazeReducer(testMazeState, mouseUp());
    expect(actual.isMouseDown).toEqual(false);
  });

  it('should handle clickFeatNode', () => {
    const actual = mazeReducer(
      testMazeState,
      clickFeatNode({
        nodeId: '3-5',
        nodeStatus: NODE_STATUS.START,
      }),
    );
    expect(actual.clickedFeatNodeInfo).toEqual({
      id: '3-5',
      status: NODE_STATUS.START,
    });
    expect(actual.isFeatNodeClick).toEqual(true);
  });

  it('should handle changeNormalNode', () => {
    const NODE_ID = '2-1';
    const actual = mazeReducer(testMazeState, changeNormalNode(NODE_ID));

    expect(actual.nodes.byId[NODE_ID].status).toEqual(NODE_STATUS.WALL);
  });

  it('should handle changeFeatNode', () => {
    const FEAT_NODE_ID = '3-5';
    const TARGET_NODE_ID = '3-6';

    const mouseClickState = mazeReducer(testMazeState, mouseDown());

    const clickedFeatNodeState = mazeReducer(
      mouseClickState,
      clickFeatNode({
        nodeId: FEAT_NODE_ID,
        nodeStatus: testMazeState.nodes.byId[FEAT_NODE_ID].status,
      }),
    );

    expect(clickedFeatNodeState.isFeatNodeClick).toEqual(true);
    expect(clickedFeatNodeState.clickedFeatNodeInfo).toEqual({
      id: FEAT_NODE_ID,
      status: NODE_STATUS.START,
    });

    const actual = mazeReducer(
      clickedFeatNodeState,
      changeFeatNode({
        targetNodeId: TARGET_NODE_ID,
        targetNodeStatus:
          clickedFeatNodeState.nodes.byId[TARGET_NODE_ID].status,
      }),
    );

    expect(actual.nodes.byId[TARGET_NODE_ID].status).toEqual(NODE_STATUS.START);
  });

  // it("should handle incrementByAmount", () => {
  //   const actual = mazeReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });

  // it("should handle incrementByAmount", () => {
  //   const actual = mazeReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });

  // it("should handle incrementByAmount", () => {
  //   const actual = mazeReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });

  afterEach(() => {
    testMazeState = mazeReducer(testMazeState, clearVisitedAndPathNodes());
    testMazeState = mazeReducer(testMazeState, clearWallAndWeightNode());
  });
});
