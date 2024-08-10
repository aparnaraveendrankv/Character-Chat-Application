import React from 'react';
import TextToSpeechButton from './TextToSpeechButton'; // Make sure the path is correct
import { Card, CardContent, Typography, Box } from '@mui/material';

const ChatBox = ({ conversations }) => {
  return (
    <Box className="chatbox" sx={{ mt: 4 }}>
      {conversations.map((conv, index) => (
        <Card key={index} variant="outlined" sx={{ mb: 2 }}>
          <CardContent>
            <Typography variant="subtitle1" fontWeight="bold">
              {conv.character}
            </Typography>
            <Typography variant="body1">{conv.text}</Typography>
            <TextToSpeechButton text={conv.text} />
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ChatBox;
