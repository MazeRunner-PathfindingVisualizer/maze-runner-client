import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line no-unused-vars
import { current } from '@reduxjs/toolkit';

import { ALGORITHM, NODE_STATUS } from '../../constant';
import {
  calcMazeBlockCount,
  createNodes,
  isFeatNode,
  calcPathNodeIds,
} from '../../util/maze';
import { DFS } from '../../algorithms/DFS';
import { BFS } from '../../algorithms/BFS';

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
  animationTimeoutId: null,
  animatedPathNodeIds: [],

  isMouseDown: false,
  isFeatNodeClick: false,
  clickedFeatNodeInfo: {
    id: null,
    status: null,
  },

  isProgressive: false,

  currentJammingBlockType: NODE_STATUS.WALL,

  weightValue: 10,
};

export const mazeOptionsSlice = createSlice({
  name: 'maze',
  initialState,
  reducers: {
    createMaze: (state, action) => {
      const { width, height } = action.payload;

      state.width = width;
      state.height = height;

      const { widthCount, heightCount } = calcMazeBlockCount(width, height);

      state.widthCount = widthCount;
      state.heightCount = heightCount;

      const { allIds, byId } = createNodes(widthCount, heightCount);

      state.nodes.byId = byId;
      state.nodes.allIds = allIds;

      state.startNodeId = `${parseInt(heightCount * 0.5, 10)}-${parseInt(
        widthCount * 0.25,
        10,
      )}`;
      state.endNodeId = `${parseInt(heightCount * 0.5, 10)}-${parseInt(
        widthCount * 0.75,
        10,
      )}`;
    },
    mouseDown: (state) => {
      if (state.isProgressive) {
        return;
      }

      state.isMouseDown = true;
    },
    mouseUp: (state) => {
      if (state.isProgressive) {
        return;
      }

      state.isMouseDown = false;
      state.isFeatNodeClick = false;
      state.clickedFeatNodeInfo = { id: null, status: null };
    },
    clickFeatNode: (state, action) => {
      if (state.isProgressive) {
        return;
      }

      state.isFeatNodeClick = true;
      const { nodeId: id, nodeStatus: status } = action.payload;
      state.clickedFeatNodeInfo = { id, status };
    },
    changeNormalNode: (state, action) => {
      if (state.isProgressive) {
        return;
      }

      const targetNodeId = action.payload;
      const targetNode = state.nodes.byId[targetNodeId];

      if (isFeatNode(targetNode.status)) {
        return;
      }

      if (
        targetNode.status === NODE_STATUS.UNVISITED ||
        targetNode.status === NODE_STATUS.VISITED ||
        targetNode.status === NODE_STATUS.PATH
      ) {
        targetNode.status = state.currentJammingBlockType;
      } else if (targetNode.status !== state.currentJammingBlockType) {
        targetNode.status = state.currentJammingBlockType;
      } else if (targetNode.status === state.currentJammingBlockType) {
        targetNode.status = NODE_STATUS.UNVISITED;
      }
    },
    changeFeatNode: (state, action) => {
      if (state.isProgressive) {
        return;
      }

      const { targetNodeId, targetNodeStatus } = action.payload;
      const { id: featNodeId, status: featNodeStatus } =
        state.clickedFeatNodeInfo;

      if (isFeatNode(targetNodeStatus)) {
        return;
      }

      if (state.isMouseDown) {
        state.nodes.byId[targetNodeId].status = featNodeStatus;
        state.nodes.byId[featNodeId].status = NODE_STATUS.UNVISITED;

        if (featNodeStatus === NODE_STATUS.START) {
          state.startNodeId = targetNodeId;
        }

        if (featNodeStatus === NODE_STATUS.END) {
          state.endNodeId = targetNodeId;
        }

        if (featNodeStatus === NODE_STATUS.MIDDLE) {
          state.middleNodeId = targetNodeId;
        }

        state.clickedFeatNodeInfo.id = targetNodeId;
      }
    },
    startPathfinding: (state, action) => {
      const { nodes, startNodeId, endNodeId, middleNodeId, animatedNodeIds } =
        state;

      const algorithmName = action.payload;

      if (!middleNodeId) {
        let result;

        switch (algorithmName) {
          case ALGORITHM.DFS: {
            result = DFS(nodes.byId, startNodeId, endNodeId, animatedNodeIds);
            break;
          }

          case ALGORITHM.BFS: {
            result = BFS(nodes.byId, startNodeId, endNodeId, animatedNodeIds);
            break;
          }

          default: {
            result = { message: 'check your algorithm', animatedNodeIds: [] };
          }
        }

        state.animatedNodeIds = result.animatedNodeIds;

        if (result.message === 'success') {
          state.animatedPathNodeIds = calcPathNodeIds(
            result.animatedNodeIds,
            state.nodes.byId,
          );
        }
      }
    },
    visitNode: (state, action) => {
      const nodeId = action.payload;

      if (isFeatNode(state.nodes.byId[nodeId].status)) {
        return;
      }

      state.nodes.byId[nodeId].status = NODE_STATUS.VISITED;
    },
    markPathNode: (state, action) => {
      const pathNodeId = action.payload;

      if (isFeatNode(state.nodes.byId[pathNodeId].status)) {
        return;
      }

      state.nodes.byId[pathNodeId].status = NODE_STATUS.PATH;
    },
    setAnimationTimeoutId: (state, action) => {
      state.animationTimeoutId = action.payload;
    },
    startAnimation: (state) => {
      state.isProgressive = true;
    },
    endAnimation: (state) => {
      state.isProgressive = false;
      state.animatedNodeIds = [];
      state.animatedPathNodeIds = [];
    },
    clearVisitedAndPathNodes: (state) => {
      state.nodes.allIds.forEach((row) => {
        row.forEach((id) => {
          if (
            state.nodes.byId[id].status === NODE_STATUS.VISITED ||
            state.nodes.byId[id].status === NODE_STATUS.PATH
          ) {
            state.nodes.byId[id].status = NODE_STATUS.UNVISITED;
          }
        });
      });
    },
    changeCurrentJammingBlockType: (state, action) => {
      const jammingBlockType = action.payload;

      if (
        jammingBlockType !== NODE_STATUS.WALL &&
        jammingBlockType !== NODE_STATUS.WEIGHTED
      ) {
        return;
      }

      state.currentJammingBlockType = jammingBlockType;
    },
  },
});

export const {
  createMaze,
  mouseDown,
  mouseUp,
  clickFeatNode,
  changeNormalNode,
  changeFeatNode,
  startPathfinding,
  visitNode,
  markPathNode,
  setAnimationTimeoutId,
  startAnimation,
  endAnimation,
  clearVisitedAndPathNodes,
  changeCurrentJammingBlockType,
} = mazeOptionsSlice.actions;

export const selectMaze = (state) => state.maze;
export const selectMazeWidth = (state) => state.maze.width;
export const selectMazeHeight = (state) => state.maze.height;
export const selectAllIds = (state) => state.maze.nodes.allIds;
export const selectById = (state) => state.maze.nodes.byId;
export const selectIsProgressive = (state) => state.maze.isProgressive;
export const selectIsMouseDown = (state) => state.maze.isMouseDown;
export const selectIsFeatNodeClick = (state) => state.maze.isFeatNodeClick;
export const selectAnimatedNodes = (state) => state.maze.animatedNodeIds;
export const selectAnimationTimeoutId = (state) =>
  state.maze.animationTimeoutId;
export const selectAnimatedPathNodeIds = (state) =>
  state.maze.animatedPathNodeIds;
export const selectCurrentJammingBlockType = (state) =>
  state.maze.currentJammingBlockType;

export default mazeOptionsSlice.reducer;
