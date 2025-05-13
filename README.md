# GooChat Message Sender

A web interface for sending various types of messages through the GooChat API.

## Features

- Send multiple types of messages:
  - Text messages
  - Links
  - Images
  - Videos
  - Files
  - Stickers
  - Mixed media
- Batch sending (1-1000 messages)
- Optional message destruction time
- Real-time progress tracking
- Success/failure statistics

## Setup

1. Install dependencies for both frontend and backend:

```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

2. Set up environment variables:

Create a `.env` file in the root directory with:

```env
GOOCHAT_API_KEY=your_api_key_here
GOOCHAT_API_URL=https://api.goochat.com # Optional, defaults to this URL
PORT=3000 # Optional, defaults to 3000
```

## Running the Application

1. Start the backend server:

```bash
npm start
```

2. Start the frontend development server:

```bash
cd frontend
npm run dev
```

3. Open your browser and navigate to the URL shown in the frontend server output (typically http://localhost:5173).

## Usage

1. Enter the number of messages you want to send (1-1000)
2. Optionally, set a destruction time for the messages
3. Click on any message type button to start sending
4. Monitor the progress and statistics in real-time

## Message Types

- **Text**: Sends "Message {number}"
- **Link**: Sends "www.{number}.com"
- **Image**: Uses dummyimage.com with incrementing numbers
- **Video**: Uses S3 video URLs with thumbnails
- **File**: Sends PDF file URLs
- **Sticker**: Sends stickers with packageId and stickerId
- **Media**: Alternates between images and videos

## Error Handling

- Invalid message counts (outside 1-1000) are rejected
- Failed messages are tracked and reported
- API errors are displayed in the UI
- Detailed error logging in the browser console

## Development

The project uses:

- Frontend:
  - React with TypeScript
  - Vite
  - Chakra UI
  - Axios

- Backend:
  - Express
  - CORS
  - Axios

## License

MIT 