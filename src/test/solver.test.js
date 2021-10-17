const Solver = require('../Solver');
const Generator = require('../Generator');
const Prando = require('prando');

const testOptions = {
  width: 4,
  height: 4,
  seed: 'testseed',
  algorithm: 'DEPTHFIRST'
};

/* eslint-env jest */
describe('Constructor', () => {
  let gen, testMaze;

  beforeEach(() => {
    gen = new Generator(testOptions.width, testOptions.height);
    testMaze = gen.generateMaze(testOptions.algorithm, new Prando(testOptions.seed));
  });

  it('Solves maze with a given seed', () => {
    const testStart = {
      row: 0,
      column: 0
    };
    const testGoal = {
      row: 3,
      column: 3
    };
    const testSolver = new Solver(testMaze, testStart, testGoal);
    const expected = [
      {
        column: 0,
        row: 0
      },
      {
        column: 0,
        row: 1
      },
      {
        column: 0,
        row: 2
      },
      {
        column: 1,
        row: 2
      },
      {
        column: 2,
        row: 2
      },
      {
        column: 3,
        row: 2
      },
      {
        column: 3,
        row: 3
      }
    ];
    const actual = testSolver.path;
    expect(actual).toEqual(expected);
  });

  describe('goal errors', () => {
    it('throws an error if the goal row is larger than the width of the maze', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 4,
        column: 3
      };
      expect(() => {
        const testSolver = new Solver(testMaze, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal rows must be less than maze height (3).');
    });

    it('throws an error if the goal column is larger than the width of the maze', () => {
      const testStart = {
        row: 0,
        column: 0
      };
      const testGoal = {
        row: 3,
        column: 4
      };
      expect(() => {
        const testSolver = new Solver(testMaze, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal columns must be less than maze width (3).');
    });

    it.todo('you need to do error handling for if any index is -1');
  });

  describe('start errors', () => {
    it('throws an error if the start row is larger than the width of the maze', () => {
      const testStart = {
        row: 4,
        column: 3
      };
      const testGoal = {
        row: 0,
        column: 0
      };
      expect(() => {
        const testSolver = new Solver(testMaze, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal rows must be less than maze height (3).');
    });

    it('throws an error if the start column is larger than the width of the maze', () => {
      const testStart = {
        row: 3,
        column: 4
      };
      const testGoal = {
        row: 0,
        column: 0
      };
      expect(() => {
        const testSolver = new Solver(testMaze, testStart, testGoal);
        console.log(testSolver.path);
      }).toThrowError('start/goal columns must be less than maze width (3).');
    });
  });
});
