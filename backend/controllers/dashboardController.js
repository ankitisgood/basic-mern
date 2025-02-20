import tasks from '../models/taskModel.js';
import { calculateTimeLapsed, calculateBalanceTime, calculateTotalTime } from '../utils/timeCalculations.js';

export const getDashboardStats = async (req, res) => {
  // console.log(tasks)
  const tasks1  = await tasks.find();
  const totalTasks = tasks1.length;
  const completedTasks = tasks1.filter(task => task.status === 'finished').length;
  const pendingTasks = tasks1.filter(task => task.status === 'pending');

  const pendingStats = pendingTasks.reduce(
    (acc, task) => {
      const now = new Date();
      acc.totalTimeLapsed += calculateTimeLapsed(task.startTime, now);
      acc.balanceTimeLeft += calculateBalanceTime(task.endTime, now);
      return acc;
    },
    { totalTimeLapsed: 0, balanceTimeLeft: 0 }
  );

  const totalCompletedTime = tasks1
    .filter(task => task.status === 'finished')
    .reduce((sum, task) => sum + calculateTotalTime(task.startTime, task.endTime), 0);

  const avgCompletionTime = completedTasks > 0 ? totalCompletedTime / completedTasks : 0;

  res.json({
    totalTasks,
    completedPercentage: (completedTasks / totalTasks) * 100,
    pendingPercentage: ((totalTasks - completedTasks) / totalTasks) * 100,
    pendingStats,
    avgCompletionTime
  });
};
