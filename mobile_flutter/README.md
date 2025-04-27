# Task Management Mobile App (Flutter)

## Project Summary
This Flutter application provides a mobile interface for managing tasks via a RESTful API. Users can view, create, edit, and delete tasks on their Android or iOS device. The UI is clean, responsive, and optimized for phones and tablets, enabling efficient task management on the go.

### Key Features
- **Task Listing**  
  Display all tasks in a scrollable list.  
- **Add & Edit Tasks**  
  Create new tasks or modify existing ones through modal dialogs.  
- **Status Toggle**  
  Mark tasks as “done” or “pending” with a single tap.  
- **Date & Status Filters**  
  Filter tasks by creation date and status.  
- **API Integration**  
  Uses Dio to communicate with a Laravel-powered backend.  
- **Pull-to-Refresh**  
  Swipe down to refresh the task list.  

---

## Setup

### Requirements
- **Flutter SDK** ≥ 3.0.0  
- **Dart SDK** ≥ 2.18.0  
- Android Studio or VS Code with Flutter extensions  
- Android/iOS emulator or physical device  

### Clone the Repository
```bash
git clone https://github.com/masrudmubarok/apique-project.git
cd apique-project/mobile_flutter
```

### Install Dependencies
```bash
flutter pub get
```

### Run on Emulator or Device
```bash
flutter run
```
This will build and launch the app on the connected emulator or device.

---

## Notes
- The app expects the backend API at the URL defined in `lib/utils/constants.dart`.
- By default, tasks are fetched, filtered by today’s date, and sorted ascending by ID.
- Date filtering uses the native Flutter showDatePicker widget.
