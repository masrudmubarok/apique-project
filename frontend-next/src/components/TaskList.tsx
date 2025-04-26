"use client";

import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button, IconButton, MenuItem, Select, SelectChangeEvent, FormControl, InputLabel } from "@mui/material";
import { Trash2 } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { getTasks, updateTaskStatus, deleteTask } from "../utils/api";

type Task = {
  id: number;
  title: string;
  status: string;
  created_at: string;
};

export default function TaskList() {
  const [hasMounted, setHasMounted] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "done" | "pending">("all");

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (!hasMounted) return;
    (async () => {
      setLoading(true);
      try {
        const fetchedTasks = await getTasks(selectedDate);
        console.log("Fetched tasks:", fetchedTasks);
        setTasks(fetchedTasks);
        setError(null);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [selectedDate, hasMounted]);

  const toggle = async (id: number) => {
    const updatedStatus = tasks.find((task) => task.id === id)?.status === "done" ? "pending" : "done";
    try {
      await updateTaskStatus(id, updatedStatus);
      setTasks((t) =>
        t.map((task) =>
          task.id === id ? { ...task, status: updatedStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status", error);
    }
  };

  const remove = async (id: number) => {
    try {
      await deleteTask(id);
      setTasks((t) => t.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task", error);
    }
  };

  const isSameDate = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate();

  const filtered = tasks.filter((task) => {
    const taskDate = new Date(task.created_at);
    const dateMatch = isSameDate(taskDate, selectedDate);
    const statusMatch = filter === "all" || task.status === filter;
    return dateMatch && statusMatch;
  });

  console.log("Current filter:", filter);
  console.log("Filtered tasks:", filtered);

  const taskStatusClass = (status: string) => 
    status === "done" ? "line-through text-gray-400" : "text-gray-900";

  if (!hasMounted) return null;

  return (
    <div className="p-4 md:p-8 bg-gradient-to-br from-blue-50 to-purple-100 min-h-screen overflow-visible">
      <div className="flex justify-between items-center mb-6 w-full">
        <FormControl variant="outlined" className="w-1/5">
          <InputLabel>Status</InputLabel>
          <Select
            value={filter}
            onChange={(e: SelectChangeEvent) =>
              setFilter(e.target.value as any)
            }
            label="Status"
            className="bg-white"
          >
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="done">Done</MenuItem>
            <MenuItem value="pending">Pending</MenuItem>
          </Select>
        </FormControl>

        <div className="relative w-1/3 flex justify-end">
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
        </div>
      </div>

      {loading ? (
        <div className="text-center text-gray-600">Loading…</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : filtered.length > 0 ? (
        <ul className="space-y-3 w-full">
          {filtered.map((task) => (
            <li
              key={task.id}
              className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm w-full"
            >
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={task.status === "done"}
                  onChange={() => toggle(task.id)}
                  className="h-5 w-5 text-purple-600 rounded-full"
                />
                <span className={taskStatusClass(task.status)}>
                  {task.title}
                </span>
              </label>
              <div className="flex items-center space-x-4">
                <IconButton size="small" onClick={() => remove(task.id)}>
                  <Trash2 className="h-4 w-4 text-red-500" />
                </IconButton>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center text-gray-600">No tasks to show.</div>
      )}
    </div>
  );
}