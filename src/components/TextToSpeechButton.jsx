import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import { AssemblyAI } from 'assemblyai'; // Correctly import AssemblyAI

const TextToSpeechButton = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [transcript, setTranscript] = useState('');

  const handleTextToSpeech = async () => {
    try {
      const client = new AssemblyAI({
        apiKey: 'd0ae05d31aab4844b470de8052766d5e',
      });

      const audioUrl = 'https://storage.googleapis.com/aai-web-samples/5_common_sports_injuries.mp3';
      const config = {
        audio_url: audioUrl,
      };

      const response = await client.transcripts.create(config);
      const transcriptId = response.id;

      // Poll for the transcription result
      let transcriptResponse;
      while (true) {
        transcriptResponse = await client.transcripts.get(transcriptId);
        if (transcriptResponse.status === 'completed') {
          break;
        }
        if (transcriptResponse.status === 'failed') {
          throw new Error('Transcription failed');
        }
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before polling again
      }

      setTranscript(transcriptResponse.text);
      enqueueSnackbar('Text-to-Speech generated successfully', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to generate Text-to-Speech', { variant: 'error' });
      console.error('Error:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <Button onClick={handleTextToSpeech} variant="contained">
        Convert to Speech
      </Button>
      {transcript && (
        <Typography variant="body1" style={{ marginTop: '20px' }}>
          Transcription: {transcript}
        </Typography>
      )}
    </div>
  );
};

export default TextToSpeechButton;
