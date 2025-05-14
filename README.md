# GooChat Message Sender

A web application for sending messages through the GooChat API with support for multiple message types and batch sending capabilities.

## Features

- Send various types of messages:
  - Text messages (with or without input)
  - Links
  - Images
  - Videos
  - Files
- Batch message sending
  - Select multiple chat rooms
  - Specify message count per room (1-1000)
- Real-time progress tracking
  - Progress bar for each operation
  - Success/failure status updates
- User Information Display
  - Shows user data after phone number confirmation
- Multi-room Support
  - Select multiple rooms for batch sending
  - Individual success/failure tracking per room

## Setup

1. Install dependencies:

```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
node server.js
```

2. Configure your environment:

Create a `.env` file in the root directory with:

```env
PORT=3000 # Optional, defaults to 3000
```

## Running the Application

Start the server:

```bash
npm start
```

The application will be available at `http://localhost:3000` (or your configured PORT).

## Dependencies

The project uses the following main dependencies:
- express: ^4.18.2
- axios: ^1.6.7
- cors: ^2.8.5
- form-data: ^4.0.2
- multer: ^1.4.5-lts.2
- accepts: ^1.3.8

## Usage Guide

### Single Message Sending
1. Enter the recipient's information
2. Choose the message type (text, link, image, video, file)
3. Send the message

### Batch Message Sending
1. Click "Send Messages in Batch"
2. Select target chat rooms from the popup
3. Specify the number of messages for each room
4. Monitor the sending progress in real-time
5. View the success/failure summary after completion

### Progress Tracking
- Watch the progress bar for sending status
- View detailed status updates during the process
- Check the final summary for success/failure counts

## Error Handling
- Validates input parameters
- Provides clear error messages
- Shows sending status for each operation
- Maintains error logs for troubleshooting

## Security
- Secure API communication
- Input validation and sanitization
- Error handling and logging

## License

MIT 
