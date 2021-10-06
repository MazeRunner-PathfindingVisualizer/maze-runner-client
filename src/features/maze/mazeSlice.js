import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

// import { startPathfinding } from './mazeAPI';
import { ALGORITHM, NODE_STATUS } from '../../constant';
import { calcMazeBlockCount, createNodes, isFeatNode } from '../../util/maze';
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
  animatedNodes: [],

  isMouseDown: false,
  isFeatNodeClick: false,
  clickedFeatNodeInfo: {
    id: null,
    status: null,
  },

  isProgressive: false,
};

export const startPathfindingAsync = createAsyncThunk(
  'maze/startPathfinding',
  async (byId, startNodeId, targetNodeId, animatedNodes) => {
    console.log('pathfinding start!');
    const response = await startPathfinding(
      byId,
      startNodeId,
      targetNodeId,
      animatedNodes,
    );
    console.log('pathfinding end!');
    return response.result;
  },
);

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

      if (state.nodes.byId[targetNodeId].status === NODE_STATUS.UNVISITED) {
        state.nodes.byId[targetNodeId].status = NODE_STATUS.WALL;
      } else if (state.nodes.byId[targetNodeId].status === NODE_STATUS.WALL) {
        state.nodes.byId[targetNodeId].status = NODE_STATUS.UNVISITED;
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
      const { nodes, startNodeId, endNodeId, middleNodeId, animatedNodes } =
        state;

      const algorithmName = action.payload;

      if (!middleNodeId) {
        let result;
        switch (algorithmName) {
          case ALGORITHM.DFS: {
            result = DFS(nodes.byId, startNodeId, endNodeId, animatedNodes);
            break;
          }

          case ALGORITHM.BFS: {
            result = BFS(nodes.byId, startNodeId, endNodeId, animatedNodes);
            break;
          }

          default: {
            result = 'check your algorithm';
          }
        }

        console.log('🔥', result);
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(startPathfindingAsync.pending, (state) => {
        console.log('async pending...');
        state.isProgressive = true;
      })
      .addCase(startPathfindingAsync.fulfilled, (state, action) => {
        console.log('async fulfilled!');
        state.isProgressive = false;

        console.log('Result: ', action.payload);
      })
      .addCase(startPathfindingAsync.rejected, (state) => {
        console.log('async rejected!');
        state.isProgressive = false;
      });
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
} = mazeOptionsSlice.actions;

export const selectMaze = (state) => state.maze;
export const selectAllIds = (state) => state.maze.nodes.allIds;
export const selectIsProgressive = (state) => state.maze.isProgressive;

export default mazeOptionsSlice.reducer;
