# csiinternship
# React Todo List App 📝

A simple, stylish To-Do List application built with React. Supports localStorage, date/time (with AM/PM), sorting, filtering, and priority tagging.

## 🔧 Features

- Add, delete, and complete tasks
- Store tasks in localStorage
- Add date and time (AM/PM format)
- Set task priority (High, Medium, Low)
- Sort by Date, Time, or Priority
- Filter Completed or Incomplete tasks
  
## 🧪 Testing Guidance

Manually test the following features in the browser:

### 1. Task Input & Validation
- Try adding a task with:
  - Only a name
  - Name + date + time
  - Blank task → You should get an alert

### 2. Task Display
- After adding a task, it should appear immediately in the list.
- Each task shows:
  - Task name
  - Priority icon
  - Date & Time (with AM/PM)

### 3. Completion Toggle
- Click the checkbox → Task should be marked as "Completed"
- The text gets a line-through and green "Completed" label appears

### 4. Delete Task
- Click on the ❌ button → Task should disappear

### 5. Sorting & Filtering
- Sort by Priority, Date, or Time from dropdowns
- Use the filter to:
  - View All tasks
  - View Completed tasks
  - View Incomplete tasks

### 6. Local Storage
- Refresh the page → All tasks should persist

---

### 🛠 Start App Locally

```bash
npm install
npm start
