"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button, IconButton, MenuItem, Select, SelectChangeEvent, FormControl, InputLabel, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from "@mui/material";
import { Plus, Pencil, Trash2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTasks, createTask, updateTask, updateTaskStatus, deleteTask } from "../utils/api";

type Task = {
  id: number;
  title: string;
  status: string;
  created_at: string;
};

export default function TaskList() {
  const [open, setOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => { setOpen(false); setNewTaskTitle(""); };

  const [hasMounted, setHasMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editedTitle, setEditedTitle] = useState<string>("");

  useEffect(() => { setHasMounted(true); }, []);

  useEffect(() => {
    if (!hasMounted) return;
    (async () => {
      setLoading(true);
      try {
        const fetched = await getTasks(selectedDate);
        setTasks(fetched);
        setError(null);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedDate, hasMounted]);

  const toggle = async (id: number) => {
    const task = tasks.find((t) => t.id === id);
    if (!task) return;
    const newStatus = task.status === "done" ? "pending" : "done";
    try {
      const updated = await updateTaskStatus(id, newStatus);
      setTasks((ts) => ts.map((t) => (t.id === id ? updated : t)));
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((ts) => ts.filter((t) => t.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditClick = (task: Task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  const handleTitleSubmit = async (task: Task) => {
    if (!editedTitle.trim()) return;
    try {
      const updated = await updateTask(task.id, editedTitle, task.status);
      setTasks((ts) => ts.map((t) => (t.id === task.id ? updated : t)));
      setEditingTaskId(null);
    } catch (err) {
      console.error("Failed updating task:", err);
    }
  };

  const handleAddTask = async () => {
    if (!newTaskTitle.trim()) return;
    try {
      const added = await createTask(newTaskTitle, "pending");
      setTasks((ts) => [added, ...ts]);
      handleClose();
    } catch (err) {
      console.error("Failed adding task:", err);
    }
  };

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const filtered = tasks.filter((task) => {
    const d = new Date(task.created_at);
    const dateMatch = isSameDate(d, selectedDate);
    const statusMatch = filter === "all" || task.status === filter;
    return dateMatch && statusMatch;
  });

  const taskClass = (s: string) =>
    s === "done" ? "line-through text-gray-400" : "text-gray-900";

  if (!hasMounted) return null;

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen">
      {/* filters & add button */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 space-y-4 md:space-y-0 md:space-x-4">
        <Button
            onClick={handleOpen}
            variant="contained"
            className="bg-purple-600 text-white flex items-center space-x-2 h-12 p-2 w-full md:w-auto"
            >
            <Plus className="h-6 w-6" />
            <span>Add</span>
        </Button>

        <div className="flex md:justify-end w-full flex-wrap gap-4 mt-6 md:mt-0">
            <Popover>
                <PopoverTrigger asChild>
                <Button variant="outlined" className="bg-white">
                    {selectedDate ? format(selectedDate, "PPP") : "Select date"}
                </Button>
                </PopoverTrigger>
                <PopoverContent
                className="p-2 bg-white rounded shadow-lg z-50"
                side="bottom"
                sideOffset={8}
                >
                <DatePicker
                    selected={selectedDate}
                    onChange={(d) => d && setSelectedDate(d)}
                    inline
                />
                </PopoverContent>
            </Popover>

          <FormControl variant="outlined" className="w-[9.7rem] md:w-1/5">
            <InputLabel>Status</InputLabel>
            <Select
            value={filter}
            onChange={(e: SelectChangeEvent) => setFilter(e.target.value as any)}
            label="Status"
            >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
            </Select>
          </FormControl>
        </div>
      </div>

      {/* create task modal */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add New Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Title"
            type="text"
            fullWidth
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddTask} variant="contained" className="bg-purple-600 text-white">
            Create
          </Button>
        </DialogActions>
      </Dialog>

      {/* task list */}
      {loading ? (
        <div className="text-center">Loading…</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filtered.length ? (
        <ul className="space-y-3">
          {filtered.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
              <div className="flex items-center space-x-2 w-full">
                <input type="checkbox" checked={task.status === "done"} onChange={() => toggle(task.id)} className="h-5 w-5 text-purple-600" />
                {editingTaskId === task.id ? (
                  <input className="border px-2 py-1 flex-1  text-black" value={editedTitle} onChange={(e) => setEditedTitle(e.target.value)} onBlur={() => handleTitleSubmit(task)} onKeyDown={(e) => e.key === "Enter" && handleTitleSubmit(task)} autoFocus />
                ) : (
                  <span className={taskClass(task.status)}>{task.title}</span>
                )}
              </div>
              <div className="flex space-x-2">
                <IconButton onClick={() => handleEditClick(task)}><Pencil className="text-blue-500 h-5 w-5" /></IconButton>
                <IconButton onClick={() => remove(task.id)}><Trash2 className="text-red-500 h-5 w-5" /></IconButton>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-700">No tasks to show.</div>
      )}
    </div>
  );
}