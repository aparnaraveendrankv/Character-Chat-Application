import React, { useState } from 'react';
import CharacterSelector from './components/CharacterSelector';
import ChatBox from './components/ChatBox';
import { Container, Box } from '@mui/material';

const App = () => {
  const [conversations, setConversations] = useState([]);

  const generatePrompt = (selectedCharacters) => {
    if (!selectedCharacters || selectedCharacters.length < 2) {
      return 'Error: Two characters must be selected';
    }

    const [character1, character2] = selectedCharacters;
    return `
      Character 1: ${character1}
      Character 2: ${character2}

      Generate a short rap roasting battle between ${character1} and ${character2}. Each character should have a couple of lines, and each line should be concise.
    `;
  };

  const handleSelectCharacters = async (selectedCharacters) => {
    if (!selectedCharacters || selectedCharacters.length !== 2) {
      console.error('Please select exactly 2 characters.');
      return;
    }

    const prompt = generatePrompt(selectedCharacters);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyADPG0aooJLFqu9N7MwIrdKAh_W7Id3L-Y', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      const data = await response.json();
      if (data && data.candidates && data.candidates[0]) {
        const candidate = data.candidates[0];
        const conversation = candidate.text ? candidate.text.split('\n').map(line => {
          const [character, text] = line.split(': ');
          return { character, text };
        }) : generateDefaultConversation(selectedCharacters);
        setConversations(conversation);
      } else {
        console.error('Unexpected API response structure:', data);
        setConversations(generateDefaultConversation(selectedCharacters));
      }
    } catch (error) {
      console.error('Failed to generate content:', error);
      setConversations(generateDefaultConversation(selectedCharacters));
    }
  };

  const generateDefaultConversation = (selectedCharacters) => {
    const [character1, character2] = selectedCharacters;
    return [
      { character: character1, text: `Hey ${character2}, are you ready to get roasted?` },
      { character: character2, text: `Bring it on ${character1}, I can handle your weak rhymes!` },
      { character: character1, text: `Your style is outdated, like an old MP3, while I'm fresh and clear, like HD TV.` },
      { character: character2, text: `You think you're hot, but you're just lukewarm, my lines are fire, they'll cause a storm!` },
    ];
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <CharacterSelector onSelectCharacters={handleSelectCharacters} />
        <ChatBox conversations={conversations} />
      </Box>
    </Container>
  );
};

export default App;
