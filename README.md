Character Chat Application

Overview:

The Character Chat Application is a React-based frontend application that allows users to select characters, generate dialogues between them, and convert the dialogues to speech. The application uses Shadcn UI components for styling and integrates with Large Language Model (LLM) and Text-to-Speech (TTS) APIs.



Setup and Installation

git clone <repository-url>


Install Dependencies:

npm install @shadcn/ui react-hook-form axios

Run the Application:

Start the development server with:

npm start

This command will run the application and open it in your default web browser at http://localhost:3000.

How to Use the Application


Character Selection:

Use the dropdown to select up to two characters from the predefined list.
Characters available:
Donald Trump
Peter Griffin
Kamala Harris
Ryan Reynolds (Deadpool)
Hugh Jackman (Wolverine)
Generate Dialogue:

After selecting two characters, click the "Generate Dialogue" button.

The application will send a prompt to the LLM API to generate a conversation between the selected characters.



The generated dialogue will be displayed in a chatbox format.

Text-to-Speech Conversion:

For each line of dialogue, click the "Convert to Speech" button.
