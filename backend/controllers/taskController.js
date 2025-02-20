import tasks from '../models/taskModel.js';
// import userModel from "../models/userModel.js";





 export const createTask = async (req, res) => {
  // console.log(req.user.id);
  // const { id } = req.params;
  
  try {
    // console.log(req.user.id);
    const { title, startTime, endTime, priority, status } = req.body;
    const newTask = new tasks({ user: req.user.id, title, startTime, endTime, priority, status });
    await newTask.save();
    res.status(201).json({ message: 'Task is created', success: true });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create task', success: false });
  }
}




export const deleteTaskById = async (req, res) => {
  try {
      const { id } = req.params;
      // await tasks.findByIdAndDelete(id);
      const task = await tasks.findById(id);
      const id1 = task.user._id.toString();
      // console.log(id1);
      // console.log(req.user.id);
      if (!task) {
        return res.status(400).json({ status: false, msg: "Task with given id not found" });
      }
      if (id1 !== req.user.id) {
        return res.status(403).json({ status: false, msg: "You can't delete task of another user" });
      }
      await tasks.findByIdAndDelete(id);
      res.status(200)
          .json({ message: 'Task is deleted', success: true });
  } catch (err) {
      res.status(500).json({ message: 'Failed to delete task', success: false });
  }
}
  
/*
export const deleteTaskById = async (req, res) => {
  try {
      const { id } = req.params;
      await tasks.findByIdAndDelete(id);
      res.status(200)
          .json({ message: 'Task is deleted', success: true });
  } catch (err) {
      res.status(500).json({ message: 'Failed to delete task', success: false });
  }
}
  */




export const updateTask = async (req, res) => {
  try{
  const id  = req.params.id;
  const { title, startTime, endTime, priority, status } = req.body;

  const task = await tasks.findById(id);
  const id1 = task.user._id.toString();
  if (!task) {
    return res.status(404).json({ message: "Task not found!" });
  }

  if (id1 != req.user.id) {
    return res.status(403).json({ status: false, msg: "You can't update task of another user" });
  }

  // task = await Tasks.findByIdAndUpdate(req.params.taskId, { description }, { new: true });

  task.title = title || task.title;
  task.startTime = startTime || task.startTime;
  task.endTime = endTime || task.endTime;
  task.priority = priority || task.priority;
  task.status = status || task.status;

  await task.save();

  res.status(200)
            .json({ message: 'Task Updated', success: true });
    } 
    catch (err) {
        res.status(500).json({ message: 'Failed to updated task', success: false });
    }
};


export const getTasksOfMe = async (req, res) => {
  const id  = req.user.id;
  const { priority, status, sortBy } = req.query;

  const task = await tasks.find({user: id});

  if (!task) {
    return res.status(404).json({ message: "Task not found of particular user!" });
  }

  let filteredTasks = task;

  if (priority) filteredTasks = filteredTasks.filter(task => task.priority === parseInt(priority, 10));
  if (status) filteredTasks = filteredTasks.filter(task => task.status === status);

  if (sortBy === 'startTime') filteredTasks.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  if (sortBy === 'endTime') filteredTasks.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

  res.json(filteredTasks);
};



export const getAllTasks = async (req, res) => {
  const { priority, status, sortBy } = req.query;
  const task = await tasks.find();
  let filteredTasks = task;

  if (priority) filteredTasks = filteredTasks.filter(task => task.priority === parseInt(priority, 10));
  if (status) filteredTasks = filteredTasks.filter(task => task.status === status);

  if (sortBy === 'startTime') filteredTasks.sort((a, b) => new Date(a.startTime) - new Date(b.startTime));
  if (sortBy === 'endTime') filteredTasks.sort((a, b) => new Date(a.endTime) - new Date(b.endTime));

  res.json(filteredTasks);
};




// GET /tasks?priority=1&status=Completed&sortBy=startTime

