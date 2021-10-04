import { createSlice } from '@reduxjs/toolkit';

import { NODE_STATUS } from '../../constant';
import { calcMazeBlockCount, createNodes, isFeatNode } from '../../util/maze';

const initialState = {
  width: 0,
  height: 0,
  widthCount: 0,
  heightCount: 0,
  nodes: {
    byId: {},
    allIds: [[]],
  },

  isMouseDown: false,
  isFeatNodeClick: false,
  clickedFeatNodeInfo: {
    id: null,
    status: null,
  },
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
    },
    mouseDown: (state) => {
      state.isMouseDown = true;
    },
    mouseUp: (state) => {
      state.isMouseDown = false;
      state.isFeatNodeClick = false;
      state.clickedFeatNodeInfo = { id: null, status: null };
    },
    clickFeatNode: (state, action) => {
      state.isFeatNodeClick = true;
      const { nodeId: id, nodeStatus: status } = action.payload;
      state.clickedFeatNodeInfo = { id, status };
    },
    changeNormalNode: (state, action) => {
      const targetNodeId = action.payload;

      if (state.nodes.byId[targetNodeId].status === NODE_STATUS.UNVISITED) {
        state.nodes.byId[targetNodeId].status = NODE_STATUS.WALL;
      } else if (state.nodes.byId[targetNodeId].status === NODE_STATUS.WALL) {
        state.nodes.byId[targetNodeId].status = NODE_STATUS.UNVISITED;
      }
    },
    changeFeatNode: (state, action) => {
      const { targetNodeId, targetNodeStatus } = action.payload;
      const { id: featNodeId, status: featNodeStatus } =
        state.clickedFeatNodeInfo;

      if (isFeatNode(targetNodeStatus)) {
        return;
      }
      if (state.isMouseDown) {
        state.nodes.byId[targetNodeId].status = featNodeStatus;
        state.nodes.byId[featNodeId].status = NODE_STATUS.UNVISITED;
        state.clickedFeatNodeInfo.id = targetNodeId;
      }
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
} = mazeOptionsSlice.actions;

export const selectMaze = (state) => state.maze;

export default mazeOptionsSlice.reducer;
