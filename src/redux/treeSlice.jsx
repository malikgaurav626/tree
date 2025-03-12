import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  nodes: [
    {
      id: 1,
      name: "Grandpa",
      parents: [],
      level: 0,
      axis: 0,
      age: 85,
      alive: false,
      gender: "Male",
      birthYear: 1939,
      description: "A wise elder with years of experience.",
    },
    {
      id: 2,
      name: "Father",
      parents: [1],
      level: 1,
      axis: 1,
      age: 60,
      alive: true,
      gender: "Male",
      birthYear: 1964,
      description: "A caring father and hardworking professional.",
    },
    {
      id: 3,
      name: "Chacha",
      parents: [1],
      level: 1,
      axis: -1,
      age: 58,
      alive: true,
      gender: "Male",
      birthYear: 1966,
      description: "Loves storytelling and family gatherings.",
    },
    {
      id: 4,
      name: "Me",
      parents: [2],
      level: 2,
      axis: 2,
      age: 35,
      alive: true,
      gender: "Male",
      birthYear: 1989,
      description: "A tech enthusiast and passionate coder.",
    },
    {
      id: 5,
      name: "Wife",
      parents: [],
      level: 2,
      axis: 1,
      age: 33,
      alive: true,
      gender: "Female",
      birthYear: 1991,
      description: "An amazing partner and a great artist.",
    },
    {
      id: 6,
      name: "Sister",
      parents: [3],
      level: 2,
      axis: 0,
      age: 30,
      alive: true,
      gender: "Female",
      birthYear: 1994,
      description: "Loves music and has a kind heart.",
    },
    {
      id: 7,
      name: "Son",
      parents: [4, 5],
      level: 3,
      axis: 1,
      age: 10,
      alive: true,
      gender: "Male",
      birthYear: 2014,
      description: "Curious and full of energy, loves robotics.",
    },
    {
      id: 8,
      name: "Daughter",
      parents: [4, 5],
      level: 3,
      axis: 2,
      age: 8,
      alive: true,
      gender: "Female",
      birthYear: 2016,
      description: "A creative mind, loves painting and dancing.",
    },
  ],
};

const treeSlice = createSlice({
  name: "tree",
  initialState,
  reducers: {
    addNode: (state, action) => {
      state.nodes.push(action.payload);
    },
  },
});

export const { addNode } = treeSlice.actions;
export default treeSlice.reducer;
